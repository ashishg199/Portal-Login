import React, { useState } from 'react'
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';




function SignupForm({setIsLoggedIn}) {

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [accountType, setAccountType] = useState("student");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const SignupHandler = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const accountData = { ...formData };
    const finalData = { ...accountData, accountType };
    console.log('finalData::: ', finalData);

    try {
      const response = await axios.post('http://localhost:5000/add-user', finalData);
      console.log('response::: ', response);

      if (response.status === 201) {
        toast.success("Account Created Successfully");
        setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        toast.error("Failed to create account");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Something went wrong while creating the account");
    }
  };

  return (
    <div>
      {/* Student- Instructor Tab */}

      <div className="flex bg-richblack-800 p-1 gap-x-1 rounded-full max-w-max">
        <button
          onClick={() => 
            setAccountType("student")
         }
          className={`${accountType === "student"
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200"
            } py-2 px-5 rounded-full transition-all`}
        >
          Student
        </button>

        <button
          onClick={() => 
            setAccountType("instructor")
          }
          className={`${accountType === "instructor"
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200"
            } py-2 px-5 rounded-full transition-all`}
        >
          Instructor
        </button>
      </div>


      <form onSubmit={submitHandler}>
        <div className='flex gap-3'>

          <label  className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">First Name <sup className="text-pink-200">*</sup></p>
            <input
              required
              type='text'
              name='firstName'
              value={formData.firstName}
              onChange={SignupHandler}
              placeholder='Enter First Name'
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            />

          </label>
          <label  className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">Last Name <sup className="text-pink-200">*</sup></p>
            <input
              required
              type='text'
              name='lastName'
              value={formData.lastName}
              onChange={SignupHandler}
              placeholder='Enter Last Name'
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            />

          </label>
        </div>
        <div>
          <label>
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">Email <sup className="text-pink-200">*</sup></p>
            <input
              required
              type='email'
              name='email'
              value={formData.email}
              onChange={SignupHandler}
              placeholder='Enter Email'
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            />

          </label>
        </div>
        <div className='flex gap-3'>
          <label  className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">Password <sup className="text-pink-200">*</sup></p>
            <input
              required
              type={showPassword ? ('text') : ('password')}
              name='password'
              value={formData.password}
              onChange={SignupHandler}
              placeholder='Password'
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            />
            <span 
            className="absolute right-3 top-[42px] cursor-pointer z-10"
            onClick={() => setShowPassword((prev) => !prev)} 
              >
              {showPassword ? (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>) : 
              (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>)}
            </span>

          </label>
          <label  className="w-full relative">

            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">Confirm Password <sup className="text-pink-200">*</sup></p>
            <input
              required
              type={showPassword2 ? ('text') : ('password')}
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={SignupHandler}
              placeholder='Confirm Password'
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            />
            <span onClick={() => setShowPassword2((prev) => !prev)} 
               className="absolute right-3 top-[42px] cursor-pointer z-10">
              {showPassword2 ? (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>) : 
              (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>)}
            </span>
          </label>
        </div>

        <button className="bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900 w-full"> Create Account</button>

      </form>

    </div>
  )
}

export default SignupForm 
