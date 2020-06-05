import { INIT_BANNER_LIST } from "./actionTypes"
import { Dispatch } from 'redux'
import { getBannerRequest } from '../../../api/request'

export const InitBannerList = (list: any) => {
  return {
    type: INIT_BANNER_LIST,
    value: list
  }
}

export const getBannerList = () => {
  return (dispatch: Dispatch) => {
    getBannerRequest ().then ((data: any) => {
      dispatch (InitBannerList (data.banners));
    }).catch (() => {
      console.log ("轮播图数据传输错误");
    }) 
  }
};