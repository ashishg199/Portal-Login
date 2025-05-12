import React, {useState, useEffect} from 'react'
import { Navigate } from 'react-router-dom';

function PrivateRoute({children, setIsLoggedIn}) {
    const token = localStorage.getItem("token")
  
  if(token){
    return children;
  }else{
    return <Navigate to="/login"/>
  }
}

export default PrivateRoute