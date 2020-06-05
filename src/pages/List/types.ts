import { RouteConfig } from "react-router-config";

interface DurationType {
  raw: string,
  seconds: number
}

export interface MusicType {
  id: string,
  filename: string
  title: string
  artist: string,
  album: string
  duration: DurationType
}

export interface CurrentMusicType {
  index: number,
  filename: string,
  title: string,
  artist: string,
  album: string,
  duration: number,
  id: string,
  sliderValue: number,
}

export interface ListProps extends RouteConfig {
  currentPlayList: Array<MusicType>
  currentMusic?: CurrentMusicType
  InitMusicList: Function
  UpdateCurrentMusic: Function
  progress: number
  newCurrentMusic: any
  playStatus: Boolean
  addMusicToList: Function
  updateCurrentMusic: Function
  currentMusicList: Array<MusicType>
  playPrevMusic: Function
  playNextMusic: Function
  changeMusicProgress: Function
  changeMusicVolumns: Function
  volume: number
  playCurrentMusic: Function
  playAllMusic: Function
}

export interface ListState {
  currentPlayList: Array<MusicType>
  currentMusic: CurrentMusicType
}
