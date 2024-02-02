import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { userLogin } from "../atom/userLogin";
import { useSetRecoilState } from "recoil";

function Signup() {
  const setUserLogin = useSetRecoilState(userLogin);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const createAccount = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signup",
      {
        username,
        firstName,
        lastName,
        password,
      }
    );
    localStorage.setItem("token", response.data.token);
    setUserLogin(response.data.isLogin);
    navigate("/dashboard");
  };

  return (
    <div className='w-1/3 bg-black text-white mx-auto mt-10 rounded-xl'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg w-full text-center p-2 h-max px-4'>
          <Heading label='Sign up' />
          <SubHeading label='Enter your infromation to create an account' />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder='John'
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder='Doe'
            label={"Last Name"}
          />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder='john@gmail.com'
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder='abc123'
            label={"Password"}
          />
          <div className='pt-4'>
            <Button onClick={createAccount} label={"Sign up"} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;