import { Init_User_Info } from "./actionTypes"
import { Dispatch } from 'redux'

export const InitUserInfo = (list: any) => {
  return {
    type: Init_User_Info,
    value: list
  }
}

export const Initzz = () => {
  return (dispatch: Dispatch) => {
    // getBannerRequest ().then ((data: any) => {
    //   dispatch (InitBannerList (data.banners));
    // }).catch (() => {
    //   console.log ("轮播图数据传输错误");
    // }) 
  }
};