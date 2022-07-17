import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateComponent = () => {
    // to check if user sign up or not
    const auth = localStorage.getItem('user');
    return auth ? <Outlet /> : <Navigate to="/signup" />
}

export default PrivateComponent;