import React from 'react'
import './Login.scss'
import LoginForm from '../../components/forms/login/LoginForm'
import axios from '../../utils/axios'
const Login = () => {
  const handleFormSubmit = async (e)=>{
    e.preventDefault();
    try {
      const data = await axios.post('/msg',{MACHINE_ID:111})
      console.log(data);
      
    } catch (error) {
      
    }
  }
  return (
    <div className='login'>
        <LoginForm/>

        <form onSubmit={handleFormSubmit}>
          <div className="form__control">
            <input type="text" placeholder='machineKOD' />
          </div>
          <button className='normal'>Submit</button>
        </form>
    </div>
  )
}

export default Login