import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userLogin } from "../atom/userLogin";
import axios from "axios";
import { FaUser } from "react-icons/fa";

function Navbar() {
  const [userLoginData, setUserLoginData] = useRecoilState(userLogin);
  const navigate = useNavigate();

  const logOut = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/logout"
    );

    setUserLoginData(response.data.isLogin);
    navigate("/");
  };

  return (
    <div className='flex items-center justify-between h-16 px-16 bg-black text-white'>
      <Link to='/' className='italic font-bold text-3xl'>
        PAY<span className='text-blue-500'>KARO</span>
      </Link>
      <ul className='flex items-center gap-5'>
        <Link to='/' className='hover:underline'>
          Home
        </Link>

        {!userLoginData && (
          <Link to='/signup' className='hover:underline'>
            Sign Up
          </Link>
        )}
        {!userLoginData && (
          <Link to='/signin' className='hover:underline'>
            Log In
          </Link>
        )}
        {userLoginData && (
          <Link to='/dashboard' className='hover:underline'>
            Dashboard
          </Link>
        )}
        {userLoginData && (
          <Link
            to='/'
            onClick={logOut}
            className='bg-red-600 px-4 py-1 rounded-md'
          >
            Log out
          </Link>
        )}
        {userLoginData && (
          <Link to='/account' className='text-2xl'>
            <FaUser />
          </Link>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
