import React from 'react'
import { Navigate } from 'react-router-dom';

 const Home=({isLoggedIn})=> {
  return (
    {if(isLoggedIn){
      <Navigate to="/dashboard"></Navigate>
    }},
    <div className='grid place-items-center text-richblack-100 text-3xl h-full'>Home</div>
  )
}
export default Home;