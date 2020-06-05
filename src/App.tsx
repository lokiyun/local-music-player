import React, { useEffect, useState } from 'react'
import { renderRoutes } from 'react-router-config'
import routes from './routes/router'
import { BrowserRouter } from 'react-router-dom'
import SideMenu from './components/SideMenu'
import './App.scss'
import Model from './components/Model'
import { connect } from 'react-redux'
import { updateMusicList, deleteMusicList } from './store/music/actionCreator'
import Alert from './components/Alert'
import Current from './pages/Current'
import bg from './assets/image/2.jpg'

function App(props: any) {
  const { list, updateMusicList, deleteMusicList } = props
  const [modelShow, setModelShow] = useState(false)
  const [alertShow, setAlertShow] = useState(false)
  const [alertTitle] = useState('确定将选中的歌单彻底删除?')
  const [selectId, setSelectId] = useState('')
  
  useEffect(()=>{
    let img = new Image(window.innerWidth,window.innerHeight)
    let canvas = document.querySelector<HTMLCanvasElement>('#music-bg')
    img.style.backgroundSize = 'cover'
    
    let ctx= canvas?.getContext("2d");
    img.onload = function() {
      ctx?.drawImage(img,0,0, window.innerWidth, window.innerHeight);
    }
    img.src = bg
  }, [])

  const closeModel = () => {
    setModelShow(false)
  }

  const openModel = () => {
    setModelShow(true)
  }

  const openAlert = (id: string) => {
    setSelectId(id)
    setAlertShow(true)
  }

  const closeAlert = () => {
    setAlertShow(false)
  }

  const deleteMenuItem = () => {
    let arr = window.location.href.split('/')
    let id = arr[arr.length-1]
    deleteMusicList(selectId)
    closeAlert()
    if(id === selectId) {
      arr.splice(arr.length-1, 1)
      window.history.pushState(null, '我的歌单', arr.join('/'))
    }
  }

  const newList = (obj: any) => {
    updateMusicList(obj)
    closeModel()
  }

  return (
    <BrowserRouter>
      <canvas id="music-bg" width={window.innerWidth} height={window.innerHeight}></canvas>
      {
        modelShow ? <Model closeModel={closeModel} newList={newList} /> : null
      }
      {
        alertShow ? <Alert close={closeAlert} ok={deleteMenuItem} title={alertTitle} /> : null
      }
      <SideMenu openModel={openModel} list={list} openAlert={openAlert}  />
      { renderRoutes (routes) }
      <Current />
    </BrowserRouter>
  )
}

const mapStateToProps = (state: any) => ({
  list: state.music.musicList
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateMusicList(value: any) {
      dispatch(updateMusicList(value))
    },
    deleteMusicList(id: string) {
      dispatch(deleteMusicList(id))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
