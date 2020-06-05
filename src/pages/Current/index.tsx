import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { CurrentProp, MusicType } from '../../interface'
import { 
  updateCurrentMusic, 
  playNextMusic, 
  playPrevMusic, 
  playCurrentMusic, 
  clearAllMusic 
} from '../../store/music/actionCreator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faVolumeUp, 
  faChevronLeft, 
  faPause, 
  faPlay, 
  faChevronRight, 
  faBars, 
  faTrash 
} from '@fortawesome/free-solid-svg-icons'
import { time2Str } from '../../utils'
import './style.scss'

const Current = (props: CurrentProp) => {
  const { 
    musicAudio, 
    updateCurrentMusic, 
    currentMusic, 
    currentMusicList, 
    playNextMusic, 
    playStatus, 
    playPrevMusic, 
    playCurrentMusic, 
    clearAllMusic 
  } = props
  const [sliderValue, setSliderValue] = useState(0)
  const [volume, setVolume] = useState(50)
  const [playShow, setPlayShow] = useState(false)
  useEffect(()=>{
    musicAudio.addEventListener('timeupdate', () => {
      setSliderValue(musicAudio.currentTime)
    })
    musicAudio.addEventListener('ended', () =>{
      setSliderValue(0)
      musicAudio.currentTime = 0
      playNextMusic()
    })
  }, [])

  const select = (index: number) => {
    updateCurrentMusic(currentMusicList[index])
  }

  const handlePrev = () => {
    playPrevMusic()
  }

    //下一首
  const handleNext = () => {
    playNextMusic()
  }

   //播放按钮事件
   const handlePlay = () => {
    playCurrentMusic()
  }

  //滑动条事件
  function progressChange(e: any) {
    let value = e.target.value
    value = Math.ceil(value)
    musicAudio.currentTime = value
    
    // if(typeof value === 'number') {
    //   value = Math.ceil(value)
    //   musicAudio.currentTime = value
    // }
  }

  function volumnChange(e: any) {
    let value = e.target.value
    value = Math.ceil(value)
    setVolume(value)
    musicAudio.volume = value/100
  }

  const clearAll = () => {
    clearAllMusic()
  }
  
  return (
    <div>
      <div className="fixed-bottom">
          <div className="control-btn">
            <FontAwesomeIcon icon={faChevronLeft} onClick={handlePrev} />
            {
              playStatus ? <FontAwesomeIcon icon={faPause}  className="control-play" onClick={handlePlay} /> :
              <FontAwesomeIcon icon={faPlay} onClick={handlePlay} className="control-play" />
            }
            <FontAwesomeIcon icon={faChevronRight} onClick={handleNext} />
          </div>
          <div className="control-slider">
            <div className="control-mark"><span>正在播放: {currentMusic ? currentMusic.title : ''}</span><span>{currentMusic ? time2Str(sliderValue) : '00:00'}/{currentMusic?.duration ? time2Str( currentMusic?.duration.seconds) : '00:00'}</span></div>
            <input type="range" id="play-slide" min={0} max={currentMusic ? currentMusic.duration.seconds : 0}  value={sliderValue}  onChange={progressChange} />
          </div>
          <div className="control-volumn">
            <FontAwesomeIcon icon={faVolumeUp} className="control-volume-icon" />
            <input type="range" id="volume-slide" min={0} max={100}  value={volume}  onChange={volumnChange} />
          </div>
          <div className="control-menu">
            <FontAwesomeIcon icon={faBars} onClick={()=>{
              setPlayShow(!playShow)
            }} />
          </div>
          
        </div>
      {
        playShow ? <div className="alert-menu">
        <h4 className="alert-title">播放列表<i className="alert-close" onClick={()=>setPlayShow(false)}>&times;</i></h4>
        <div className="alert-contorl">
          <div className="alert-control-count">总{currentMusicList.length}首</div>
          <div className="alert-control-btn">
            <FontAwesomeIcon icon={faTrash} onClick={clearAll} />
          </div>
        </div>
        <div className="alert-list">
          {
            currentMusicList.map((item, index) => (
              <div className="alert-list-item" key={index} onDoubleClick={()=>select(index)}>
                <span className="alert-list-item-title">{item.title}</span>
                <span>{item.duration.raw}</span>
              </div>
            ))
          }
        </div>
        
      </div> : null
      }
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  musicAudio: state.music.audio,
  currentMusic: state.music.currentMusic,
  currentMusicList: state.music.currentMusicList,
  playStatus: state.music.playStatus,
  volume: state.music.volume,
  
})

const mapDisptachToProps = (dispatch: any) => {
  return {
    updateCurrentMusic(value: MusicType) {
      dispatch(updateCurrentMusic(value))
    },
    playNextMusic() {
      dispatch(playNextMusic())
    },
    playPrevMusic() {
      dispatch(playPrevMusic())
    },
    playCurrentMusic() {
      dispatch(playCurrentMusic())
    },
    clearAllMusic() {
      dispatch(clearAllMusic())
    }
  }
}

export default connect(mapStateToProps, mapDisptachToProps)(Current)