import { INIT_BANNER_LIST } from "./actionTypes"

const defaultState = {
  bannerList: []
}

export default (state = defaultState, action: any) => {
  if(action.type === INIT_BANNER_LIST) {
    let newState = JSON.parse(JSON.stringify(state))
    console.log(action.value);
    
    newState.bannerList = action.value
    return newState
  }
  return state
}
