import { Update_Music_List, Delete_List_Item, UPDATE_CURRENT_PROGRESS, UPDATE_CURRENT_MUSIC } from "./actionTypes";
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