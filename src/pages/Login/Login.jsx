import React from 'react'
import './Login.scss'
import LoginForm from '../../components/forms/login/LoginForm'
import axios from '../../utils/axios'
const Login = () => {

  return (
    <div className='login'>
        <LoginForm/>

    </div>
  )
}

export default Login