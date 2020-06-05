import { reducer as ListReducer } from '../pages/List/store'
import { reducer as HomeReducer } from '../pages/Home/store'
import { reducer as MusicReducer } from './music/index'
import { combineReducers } from "redux"

export default combineReducers ({
  home: HomeReducer,
  list: ListReducer,
  music: MusicReducer
});