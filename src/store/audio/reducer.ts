import { Update_Music_List, Delete_List_Item, UPDATE_CURRENT_PROGRESS, UPDATE_CURRENT_MUSIC } from "./actionTypes"
import DataStore from '../../store/musicStore'
import MusicAudio from "../../utils/musicAudio"

const myList = new DataStore({'name': 'Music List'}, 'list')
let list = myList.getTracks()
const defaultState = {
  musicList: list,
  audio: MusicAudio.getInstance(),
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
  if(action.type === Update_Music_List) {
    state.musicList = [...state.musicList, action.value]
    return state
  }
  if(action.type === Delete_List_Item) {
    state.musicList = myList.getTracks()
    return state
  }
  if(action.type === UPDATE_CURRENT_PROGRESS) {
    console.log(action.value)
    state.currentMusic.progress = action.value
    return state
  }
  if(action.type === UPDATE_CURRENT_MUSIC) {
    let newState = JSON.parse(JSON.stringify(state))
    console.log(newState.audio === state.audio);
    
    state.currentMusic = action.value
    state.currentMusic.progress = 0
    state.audio.src = action.value.filename
    state.audio.load()
    state.audio.play()
    return state
  }
  return state
}
