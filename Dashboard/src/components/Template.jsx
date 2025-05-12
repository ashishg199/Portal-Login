import React from 'react'
import frameImg from '../assets/frame.png'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import { FcGoogle } from "react-icons/fc";

const Template = ({ title, desc1, desc2, image, formType, setIsLoggedIn }) => {
  return (
    <div className=' max-w-[1160px] mx-auto gap-y-0 gap-x-12 justify-between flex flex-wrap justify-content-center'>
      <div  className="w-11/12 max-w-[450px] mx-0 text-white">
        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">{title}</h1>
        <p className="text-[1.125rem] mt-4 leading-[1.625rem]">
          <span className="text-richblack-100">{desc1} </span>
          <span className="text-blue-100 italic">{desc2}</span>
        </p>

        {formType === "signup" ? (<SignupForm  setIsLoggedIn={setIsLoggedIn}/>) : (<LoginForm  setIsLoggedIn={setIsLoggedIn}/>)}

        <div className="flex w-full items-center my-4 gap-x-2">
          <div className="h-[1px] w-full bg-richblack-700"></div>
          <div className="text-richblack-700 font-medium leading-[1.375rem]">OR</div>
          <div className="h-[1px] w-full bg-richblack-700"></div>
        </div>  

        <button className="w-full flex items-center justify-center rounded-[8px] font-medium text-richblack-100 border-richblack-700 border px-[12px] py-[8px] gap-x-2 mt-6">
          <FcGoogle />
          <p>Sign Up with Google</p>
        </button>

      </div>
      <div className="relative w-11/12 max-w-[450px]">
        <img
          src={frameImg}
          alt="patter"
          width={558}
          height={504}
          loading="lazy"
          className='mt-6'

        />
        <img
          src={image}
          alt="patter"
          width={558}
          height={504}
          loading="lazy"
          className="absolute -top-4 right-4 mt-6"
        />
      </div>

    </div>
  )
}

export default Template;