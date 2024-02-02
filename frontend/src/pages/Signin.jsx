import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userLogin } from "../atom/userLogin";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setUserLogin = useSetRecoilState(userLogin);
  const navigate = useNavigate();

  const logInAccount = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signin",
      {
        username,
        password,
      }
    );
    localStorage.setItem("token", response.data.token);
    setUserLogin(response.data.isLogin);
    navigate("/dashboard");
  };

  return (
    <div className='w-1/3 bg-black text-white mx-auto mt-20 rounded-xl'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg text-center p-2 h-max px-4 w-full'>
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            placeholder='harkirat@gmail.com'
            label={"Email"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <InputBox
            placeholder='123456'
            label={"Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className='pt-4'>
            <Button label={"Sign in"} onClick={logInAccount} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}

export default Signin;
