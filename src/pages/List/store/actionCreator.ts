import { MusicType } from "../../../interface";
import { Load_MUSIC_LIST, SELECT_PLAY_MUSIC } from "./actionTypes";
import { CurrentMusicType } from "../types";

export const loadMusicList = (list: Array<MusicType>) => {
  return {
    type: Load_MUSIC_LIST,
    value: list
  }
}

export const selectPlayMusic = (value: CurrentMusicType) => {
  return {
    type: SELECT_PLAY_MUSIC,
    value
  }
}