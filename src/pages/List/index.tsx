import React, { useEffect, useState, memo } from 'react'
import { Table, TableHead, TableBody, TableRow } from '../../components/Table/table'
import { joinTime } from '../../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPauseCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ListProps, MusicType } from '../../interface'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { loadMusicList  } from './store/actionCreator'
import DataStore from '../../store/musicStore'
import './style.scss'
import { 
  addMusicToList, 
  updateCurrentMusic, 
  playCurrentMusic, 
  playAllMusic 
} from '../../store/music/actionCreator'
const { ipcRenderer } = window.require('electron')

const Home = (props: ListProps) => {
  const { 
    addMusicToList, 
    updateCurrentMusic,
    currentMusicList, 
    playCurrentMusic,
    playAllMusic 
  } = props
  
  const [pathArr, setPathArr] = useState(window.location.pathname.split('/'))
  const [pathID, setPathID] = useState(pathArr[pathArr.length-1] || '')
  const [myStore, setMyStore] = useState(new DataStore({'name': 'Music Data'}, pathID))
  const [listStore] = useState(new DataStore({'name': 'Music List'}, 'list'))
  const [listTitle, setListTitle] = useState('我的歌库')
  const [listTag, setListTag] = useState('默认')
  const [playList, setPlayList] = useState(myStore.getTracks() || [])
  
  useEffect(()=>{
    updateMusicURL()
  }, [window.location.pathname])

  //更新歌单路径
  const updateMusicURL = () => {
    let list: Array<any> = listStore.getTracks()
    let arr = window.location.pathname.split('/')
    setPathArr(arr)
    let id = arr[arr.length-1]
    if(id === 'list') {
      setListTitle('我的歌单')
      setListTag('默认')
    } else {
      list.forEach((item: any) => {
        if(item.id === id) {
          setListTitle(item.title)
          setListTag(item.tag)
        }
      })
    }
    
    
    setPathID(id || '')
    let store = new DataStore({'name': 'Music Data'}, id)
    setMyStore(store)
    setPlayList(store.getTracks())
  }
 
  //页面初始化
  useEffect(()=>{
    //导入音乐监听事件
    ipcRenderer.on('selected-file', (event: any, path: any) => {
      myStore.addTracks(path)
      setPlayList(myStore.getTracks())
    })
  }, [myStore])

  //导入歌曲
  const selectMusicFile = () => {
    ipcRenderer.send('open-music-file')
  }

  //选择一个歌曲播放
  const handlerSelectRow = (index: number) => {
    if(currentMusicList.length === 0) {
      addMusicToList(playList)
    } else {
      addMusicToList([playList[index]])
    }
    updateCurrentMusic(playList[index])
  }

  //播放按钮事件
  const handlePlay = () => {
    playCurrentMusic()
  }

  //播放全部音乐
  const playAll = () => {
    playAllMusic(playList)
  }

  const handleDelete = (id: number) => {
    myStore.deleteTrack(id)
    setPlayList(myStore.getTracks())
  }

  return (
    <div className="home-container track">
      
        <div className="list-head">
          <div className="list-title">{listTitle}</div>
          <div className="list-tag">标签: {listTag}</div>
          <button className="list-align-right list-btn-1" style={{height: '100%'}} title="导入歌曲" onClick={selectMusicFile}>导入歌曲</button>
          <button className="list-btn-2" style={{height: '100%'}} title="导入歌曲" onClick={playAll}>播放全部</button>
        </div>
        <Table striped>
          <TableHead>
            <th className="table-index">#</th>
            <th>歌曲</th>
            <th>歌手</th>
            <th>时长</th>
          </TableHead>
          <TableBody>
            {
              playList && playList.map((item: any, index: number) => (
                <TableRow className="table-row" key={item.id} onDoubleClick={()=>handlerSelectRow(index)}>
                  <td className="table-index">{index+1}</td>
                  <td className="table-title">
                    <span className="table-title-base">
                      {item.title}
                    </span>
                    <div className="table-control">
                      <span title="播放" onClick={()=>handlerSelectRow(index)}><FontAwesomeIcon icon={faPlayCircle} /></span>
                      <span title="暂停" onClick={handlePlay}><FontAwesomeIcon icon={faPauseCircle} /></span>
                      <span title="删除" onClick={()=>handleDelete(item.id)}><FontAwesomeIcon icon={faTrash} /></span>
                    </div>
                  </td>
                  <td>{item.artist}</td>
                  <td>{joinTime(item.duration.raw)}</td>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  currentMusicList: state.music.currentMusicList
})

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    InitMusicList (list: Array<MusicType>) {
      dispatch (loadMusicList(list));
    },

    addMusicToList(value: Array<MusicType>) {
      dispatch(addMusicToList(value))
    },
    updateCurrentMusic(value: MusicType) {
      dispatch(updateCurrentMusic(value))
    },
    playCurrentMusic() {
      dispatch(playCurrentMusic())
    },
    playAllMusic(value: Array<MusicType>) {
      dispatch(playAllMusic(value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Home))