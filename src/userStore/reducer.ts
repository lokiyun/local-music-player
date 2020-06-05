import { Init_User_Info } from "./actionTypes"

const defaultState = {
  userInfo: {
    username: '',
    userID: '',
    avatorUrl: ''
  },
  musicList: []
}

export default (state = defaultState, action: any) => {
  if(action.type === Init_User_Info) {
    let newState = JSON.parse(JSON.stringify(state))
    console.log(action.value);
    
    newState.userInfo = action.value
    return newState
  }
  return state
}
