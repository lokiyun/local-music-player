import MusicAudio from "../utils/musicAudio";
import { TableHTMLAttributes } from "react"
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
  sliderValue: number,
  index: number
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

export interface AlertProps {
  close: Function
  ok: Function
  title: String
}

export interface ModelProps {
  closeModel: Function 
  newList: Function
}

export interface SideMenuProp {
  openModel: Function
  list: Array<MusicType>
  openAlert: Function
}

export interface CurrentProp extends RouteConfig {
  musicAudio: MusicAudio,
  updateCurrentMusic: Function
  currentMusic: MusicType
  currentMusicList: Array<MusicType>
  playNextMusic: Function
  playPrevMusic: Function
  playCurrentMusic: Function
  playStatus: Boolean
  clearAllMusic: Function
}

interface DurationType {
  raw: string,
  seconds: number
}

export interface ListProps extends RouteConfig {
  addMusicToList: Function
  updateCurrentMusic: Function
  currentMusicList: Array<MusicType>
  playCurrentMusic: Function
  playAllMusic: Function
}

export interface ListState {
  currentPlayList: Array<MusicType>
  currentMusic: CurrentMusicType
}



export interface TableProps {
  children?: any
  border?: boolean
  striped?: boolean
}

export interface TableHeadProps {
  columns?: Array<any>
}

export interface TableBodyProps {
 
}

export interface BaseTableRowProps {
 
}


type NativeTableRowProps =  BaseTableRowProps & TableHTMLAttributes<HTMLElement>

export type TableRowProps = Partial<NativeTableRowProps>
