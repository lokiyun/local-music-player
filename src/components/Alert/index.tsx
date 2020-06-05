import React from 'react'
import './style.scss'
import { AlertProps } from '../../interface'

const Alert = (props: AlertProps) => {
  const { close, ok, title } = props
  return (
    <div className="alert-container">
      <div className="alert-header">
        {title}
      </div>
      <div className="alert-control">
        <button className="alert-okbtn" onClick={()=>ok()}>删除</button>
        <button className="alert-cancelbtn" onClick={()=>close()}>取消</button>
      </div>
    </div>
  )
}

export default Alert