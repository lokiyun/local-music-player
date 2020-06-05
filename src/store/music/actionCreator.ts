import { Update_Music_List, Delete_List_Item, UPDATE_CURRENT_PROGRESS, UPDATE_CURRENT_MUSIC, ADD_MUSIC_LIST, PLAY_PREV_MUSIC, PLAY_NEXT_MUSIC, CHANGE_MUSIC_PROGRESS, CHANGE_MUSIC_VOLUMNS, PLAY_CURRENT_MUSIC, PLAY_ALL_MUSIC, CLEAR_ALL_MUSIC } from "./actionTypes";
import DataStore from '../../store/musicStore'
import { MusicType } from "../../interface";

const myList = new DataStore({'name': 'Music List'}, 'list')

export const updateMusicList = (value: any) => {
  myList.addTracks([value])
  return {
    type: Update_Music_List,
    value
  }
}

export const deleteMusicList = (id: string) => {
  myList.deleteTrack(id)
  return {
    type: Delete_List_Item,
    id
  }
}

export const updateCurrentProgress = (value: number) => {
  return {
    type: UPDATE_CURRENT_PROGRESS,
    value
  }
}

export const updateCurrentMusic = (value: MusicType) => {
  return {
    type: UPDATE_CURRENT_MUSIC,
    value
  }
}

export const addMusicToList = (value: Array<MusicType>) => {
  return {
    type: ADD_MUSIC_LIST,
    value
  }
}

export const playPrevMusic = () => {
  return {
    type: PLAY_PREV_MUSIC
  }
}

export const playNextMusic = () => {
  return {
    type: PLAY_NEXT_MUSIC
  }
}

export const changeMusicProgress = (value: number) => {
  return {
    type: CHANGE_MUSIC_PROGRESS,
    value
  }
}

export const changeMusicVolumns = (value: number) => {
  return {
    type: CHANGE_MUSIC_VOLUMNS,
    value
  }
}

export const playCurrentMusic = () => {
  return {
    type: PLAY_CURRENT_MUSIC
  }
}

export const playAllMusic = (value: Array<MusicType>) => {
  return {
    type: PLAY_ALL_MUSIC,
    value
  }
}

export const clearAllMusic = () => {
  return {
    type: CLEAR_ALL_MUSIC
  }
}