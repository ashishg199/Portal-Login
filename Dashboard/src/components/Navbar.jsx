import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/Logo.svg';
import {toast} from 'react-toastify';


const Navbar = (props) => {
  let isLoggedIn = props.isLoggedIn;
  let setIsLoggedIn = props.setIsLoggedIn;

  console.log('I am Here----------------------------->');
  return (
    <div className="flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto">
      <Link to="/">
        <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
      </Link>

      <nav >
        <ul className="flex gap-x-6 text-richblack-100">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      {/* Button Created */}

      <div className="flex items-center gap-x-4 text-richblack-100">

        {!isLoggedIn &&
          <Link to="/login">
            <button className="bg-richblack-800 py-[6px] px-[12px] rounded-[8px] border border-richblack-700">Login</button>
          </Link>
        }
        {isLoggedIn &&
          <Link to="/">
            <button onClick={() => {
              setIsLoggedIn(false);
              toast.success("Logged out successfully")
            }
            }
            className="bg-richblack-800 py-[6px] px-[12px] rounded-[8px] border border-richblack-700">Logout</button>
          </Link>
        }
        {!isLoggedIn &&
          <Link to="/signup">
            <button className="bg-richblack-800 py-[6px] px-[12px] rounded-[8px] border border-richblack-700">Signup</button>
          </Link>
        }
        {isLoggedIn &&
          <Link to="/dashboard">
            <button className="bg-richblack-800 py-[6px] px-[12px] rounded-[8px] border border-richblack-700">Dashboard</button>
          </Link>
        }
      </div>
    </div>
  );
};

export default Navbar;


