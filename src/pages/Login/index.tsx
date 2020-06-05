import React, { useState } from 'react'
import { getLoginRequest } from '../../api/request'
import { useHistory } from 'react-router-dom'
import './style.css'

const Login = () => {
  const history = useHistory()
  const [username, setUserName] = useState<string | number | string[] | undefined>('')
  const [password, setPwdName] = useState<string | number | string[] | undefined>('')
  const userChange = (e: any) => {
    setUserName(e.target.value)
  }
  const pwdChange = (e: any) => {
    setPwdName(e.target.value)
  }
  const userLogin = () => {
    if (typeof username === 'string' && typeof password === 'string') {
      getLoginRequest(username, password).then((data: any) => {
        if (data.code === 200) {
          console.log(data);
          localStorage.setItem('usernameID', data.account.id)
          localStorage.setItem('usernToken', data.token)
          localStorage.setItem('username', data.profile.nickname)
          localStorage.setItem('userAvator', data.profile.backgroundUrl)
          history.replace('/')
        }
      })
    }
  }
  return (
    <div className="box">
      <h1>网易云登录</h1>
      <input type="text" name="" placeholder="username" value={username} onChange={userChange} />
      <input type="password" name="" placeholder="password" value={password} onChange={pwdChange} />
      <button className="login" onClick={userLogin}>登录</button>
    </div>
  )
}

export default Login