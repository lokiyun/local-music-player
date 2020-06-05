import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import { MusicType, SideMenuProp } from '../../interface'
import classnames from 'classnames'
import './style.scss'

const SideMenuItem = (props: any) => {
  const { item, index, goList, openAlert, selected } = props
  const handleOpen = (e: any, id: string) => {
    e.stopPropagation()
    openAlert(id)
  }
  const ItemStyle = classnames('side-list-item', {
    'selected': index === selected
  })
  return (
    <div className={ItemStyle} key={item.id} onClick={(e) => goList(e, index)} >{item.title}<i  onClick={(e)=>handleOpen(e,item.id)} className="side-icon" >&times;</i></div>
  )
}

const SideMenu = (props: SideMenuProp) => {
  const [selected, setSelected] = useState(-1)
  const history = useHistory()
  const goList = (e: any, index?: number) => {
    console.log(e);
    e.stopPropagation()
    if (index === -999) {
      history.push('/')
    } else if(index !== undefined) {
      history.push(`/list/${list[index].id}`)
      setSelected(index)
    } else {
      history.push('/list')
      setSelected(-1)
    }
  }
  const ItemStyle = classnames('side-list-item', {
    'selected': selected === -1
  })
  const { openModel, list, openAlert } = props
  return (
    <div className="side-nav">
      <div className="side-title">
        我的歌单
        <FontAwesomeIcon icon={faPlus} color="#fff" onClick={() => openModel()} />
      </div>
      <div className="side-list">
        <div onClick={goList} className={ItemStyle}>我喜欢的音乐</div>
        {
          list.map((item: MusicType, index: number) => <SideMenuItem key={item.id} selected={selected} item={item} index={index} goList={goList} openAlert={openAlert} />)
        }
      </div>
    </div>
  )
}

export default SideMenu