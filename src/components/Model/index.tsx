import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './style.scss'
import { ModelProps } from '../../interface'

const Model = (props: ModelProps) => {
  const { closeModel, newList } = props
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState('')
  const [titleWarn, setTitleWarn] = useState('')
  const newBtn = () => {
    if(title.length === 0) {
      setTitleWarn('请输入标题')
    } else {
      newList({
        title: title,
        tag: tag,
        id: uuidv4(),
      })
    }
    
  }
  return (
    <div className="model-container">
      <i className="model-close"  onClick={()=>closeModel()}>&times;</i>
      <div className="model-input-title">
        标题:  <input value={title} onChange={(e: any) => setTitle(e.target.value)} placeholder="请输入你的歌单标题" />
        <div className="model-title-warn">{titleWarn}</div>
      </div>
     
      <div className="model-input-tag" >
        标签: <input onChange={(e:any) => setTag(e.target.value)} value={tag} placeholder="请输入你的歌单标签" />
      </div>
      <div>
        <button type="button" onClick={newBtn}>新建</button>
      </div>
    </div>
  )
}

export default Model