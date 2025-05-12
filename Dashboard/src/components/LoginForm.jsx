import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const LoginForm = ({ setIsLoggedIn }) => {


  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const [showPassword, setShowPassword] = useState(false)

  const inputHandler = (event) => {
    setFormData((prevState) => (
      {
        ...prevState,
        [event.target.name]: event.target.value

      }
    )
    )
  }

  const submithandler = async (event) => {
    event.preventDefault();
    const accountData = { ...formData };
    console.log('accountData::: ', accountData);
    let response;
    try {
      response = await axios.get(`http://localhost:5000/get-user?username=${accountData.email}`);
      console.log('response::: ', response);
    } catch (error) {
      console.log('error::: ', error);
      response = error
    }
    if (response.status === 500) {
      toast.error("User Not Found!");
    } else if (response?.data?.data?.[0]?.password === accountData.password) {
      setIsLoggedIn(true);
      toast.success("Logged In Successfully");
      navigate("/dashboard");
    } else {
      toast.error("Passwords do not match");
    }

  }
  return (
    <div>
      <form onSubmit={submithandler}
        className='flex flex-col w-full gap-y-4 mt-6'
      >
        <label className='w-full'>
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Enter Username <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type='text'
            name='email'
            value={formData.email}
            onChange={inputHandler}
            placeholder='Enter Email Here'
            className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5" >
          </input>

        </label>

        <label  className="w-full relative">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Enter Password <sup className="text-pink-200">*</sup>
          </p>

          <input
            required
            type={showPassword ? ("text") : ("password")}
            name='password'
            value={formData.password}
            onChange={inputHandler}
            placeholder='Enter Password Here'
            className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5">
          </input>

          <span onClick={() => (setShowPassword((prev) => !prev))} className="absolute right-3 top-[38px] cursor-pointer "
            >{showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}</span>

          <Link to="/">
            <p className="text-xs mt-1 text-blue-100 max-w-max ml-auto">Forgot Password</p>
          </Link>
        </label>

        <button className="bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">Sign In</button>
      </form>
      {/* <button>Sign Up with Google</button> */}

    </div>
  )
}

export default LoginForm