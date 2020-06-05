const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron')
const isDev = require('electron-is-dev')
const DataStore = require('./musicStore')
const ffmpeg = require('./src/utils/ffmpeg/index')
const uuid = require('uuid')
const path = require('path')

const myStore = new DataStore({'name': 'Music Data'})

let mainWindow

app.on('ready', () => {
  // Menu.setApplicationMenu(null)
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      id: uuid.v4(),
      nodeIntegration: true,
      webSecurity: false
    }
  })
  const urlLocation = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './build/index.html')}`
  mainWindow.loadURL(urlLocation)
  mainWindow.webContents.on('did-finish-load',() => {
    mainWindow.send('getTracks', myStore.getTracks())
  })
  ipcMain.on('open-music-file', (event) => {
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [{ name: 'Music', extensions: ['mp3', 'flac'] }]
    }).then((files)=>{
      if (files) {
        let sendList = []
        let syncList = []
        files.filePaths.forEach((item, index) => {
          syncList.push(new ffmpeg(item).then((music) => {
            sendList.push({
              id: uuid.v4(),
              filename: item,
              title:  path.basename(item),
              artist: music.metadata.artist ? music.metadata.artist : '未知',
              album: music.metadata.album ? music.metadata.album : '未知',
              duration: music.metadata.duration ? music.metadata.duration : '未知'
            })
          }))
        })
        Promise.all(syncList).then(()=>{  
          // myStore.addTracks(sendList)
          event.sender.send('selected-file', sendList)
        })
      }
    })
  })
})

