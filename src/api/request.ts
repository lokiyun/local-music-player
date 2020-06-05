import { axiosInstance } from "./config";

export const getBannerRequest = () => {
  return axiosInstance.get ('/banner');
}

export const getLoginRequest = (username: string, password: string) => {
  return axiosInstance.get(`/login/cellphone?phone=${username}&password=${password}`)
}

export const getLoginStatus = () => {
  return axiosInstance.get('/login/status')
}

export const getUserPlayList = () => {
  
    return axiosInstance.get(`/user/playlist?uid=${sessionStorage.getItem('usernameID')}`)
  
}

export const LoginRefresh = () => {
  return axiosInstance.get('/login/refresh')
}

export const UserExit = () => {
  return axiosInstance.get('/logout')
}