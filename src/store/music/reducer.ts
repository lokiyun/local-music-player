import { Update_Music_List, Delete_List_Item, UPDATE_CURRENT_PROGRESS, UPDATE_CURRENT_MUSIC, ADD_MUSIC_LIST, PLAY_PREV_MUSIC, PLAY_NEXT_MUSIC, CHANGE_MUSIC_PROGRESS, CHANGE_MUSIC_VOLUMNS, PLAY_CURRENT_MUSIC, PLAY_ALL_MUSIC, CLEAR_ALL_MUSIC } from "./actionTypes"
import DataStore from '../../store/musicStore'
import MusicAudio from "../../utils/musicAudio"

const myList = new DataStore({'name': 'Music List'}, 'list')
let list = myList.getTracks()
let OnlyAudio = MusicAudio.getInstance()
const defaultState = {
  playStatus: false,
  musicList: list,
  audio: OnlyAudio,
  currentMusicList: [],
  progress: 0,
  currentMusic: {
    id: '',
    index: -1,
    filename: '',
    title: '',
    artist: '',
    album: '',
    duration: 0,
    progress: 0,
  }
}

export default (state = defaultState, action: any) => {
  //保持audio为唯一实例
  let newState = JSON.parse(JSON.stringify(state))
  newState.audio = OnlyAudio
  //添加歌单
  if(action.type === Update_Music_List) {
    newState.musicList = [...state.musicList, action.value]
    return newState
  }
  //删除歌单
  if(action.type === Delete_List_Item) {
    newState.musicList = myList.getTracks()
    return newState
  }
  //更新当前歌曲进度条
  if(action.type === UPDATE_CURRENT_PROGRESS) {
    newState.progress = action.value
    return newState
  }
  //播放音乐
  if(action.type === UPDATE_CURRENT_MUSIC) {
    if(newState.currentMusic.id === action.value.id && newState.playStatus) {
      newState.playStatus = false
      newState.audio.pause()
      return newState
    } else if(newState.currentMusic.id === action.value.id && !newState.playStatus) {
      newState.playStatus = true
      newState.audio.play()
      return newState
    }else {
      newState.playStatus = true
      newState.currentMusic = action.value
      newState.currentMusic.progress = 0
      newState.audio.src = action.value.filename
      newState.audio.load()
      newState.audio.play()
      return newState
    }
  }
  //添加音乐
  if(action.type === ADD_MUSIC_LIST) {  
    newState.currentMusicList = [...state.currentMusicList, ...action.value].map((item,index)=>{
      item.index = index
      return item
    })
    return newState
  }
  //播放上一首
  if(action.type === PLAY_PREV_MUSIC) {
    if(state.currentMusic.index !== 0) {
      newState.currentMusic = state.currentMusicList[state.currentMusic.index-1]
    } else {
      newState.currentMusic = state.currentMusicList[state.currentMusicList.length-1]
    }
    newState.audio.src = newState.currentMusic.filename
    newState.audio.load()
    newState.audio.play()
    return newState
  }
  //播放下一首
  if(action.type === PLAY_NEXT_MUSIC) {
    newState.audio.currentTime = 0
    if(newState.currentMusic.index !== newState.currentMusicList.length - 1) {
      newState.currentMusic = state.currentMusicList[newState.currentMusic.index+1]
    } else {
      newState.currentMusic = newState.currentMusicList[0]
    }
    newState.audio.src = newState.currentMusic.filename
    newState.audio.load()
    newState.audio.play()
    return newState
  }
  //更新音乐进度
  if(action.type === CHANGE_MUSIC_PROGRESS) {
    newState.audio.currentTime = action.value
    return newState
  }
  //改变音量
  if(action.type === CHANGE_MUSIC_VOLUMNS) {
    newState.audio.volume = action.value
    return newState
  }
  //播放当前音乐
  if(action.type === PLAY_CURRENT_MUSIC) {
    if(state.playStatus) {
      newState.playStatus = false
      newState.audio.pause()
    } else if(!state.playStatus && newState.audio.src !== '') {
      newState.playStatus = true
      newState.audio.play()
    }
    return newState
  }
  //播放所以音乐
  if(action.type === PLAY_ALL_MUSIC) {
    newState.currentMusicList = action.value
    newState.audio.src = newState.currentMusicList[0].filename
    newState.playStatus = true
    newState.audio.load()
    newState.audio.play()
    return newState
  }
  if(action.type === CLEAR_ALL_MUSIC) {
    newState.currentMusicList = []
    newState.audio.pause()
    newState.audio.src = ''
    newState.currentMusic = {
      id: '',
      index: -1,
      filename: '',
      title: '',
      artist: '',
      album: '',
      duration: 0,
      progress: 0,
    }
    return newState
  }
  return state
}
