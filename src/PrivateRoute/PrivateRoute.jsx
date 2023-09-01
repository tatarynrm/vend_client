import React from 'react'
import { Outlet } from 'react-router-dom'
import Login from '../pages/Login/Login';


const PrivateRoute = ({children}) => {
    const token = window.localStorage.getItem("token");
    return token ? <Outlet /> : <Login />;

}

export default PrivateRoute