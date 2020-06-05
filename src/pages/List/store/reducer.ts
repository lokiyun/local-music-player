import { Load_MUSIC_LIST, SELECT_PLAY_MUSIC } from "./actionTypes"
import { ListState } from "../types"

const defaultState: ListState = {
  currentPlayList: [],
  currentMusic: {
    index: -1,
    filename: '',
    title: '',
    artist: '',
    album: '',
    duration: 0,
    id: '',
    sliderValue: 0,
  }
}

export default (state = defaultState, action: any) => {
  if(action.type === Load_MUSIC_LIST) {
    let newState: ListState = JSON.parse(JSON.stringify(state))
    newState.currentPlayList = action.value
    return newState
  }
  if(action.type === SELECT_PLAY_MUSIC) {
    let newState: ListState = JSON.parse(JSON.stringify(state))
    console.log(action.value);
    
    newState.currentMusic = action.value
    return newState
  }
  return state
}
