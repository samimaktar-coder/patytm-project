import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userData } from "../atom/userData";
import axios from "axios";
import { userLogin } from "../atom/userLogin";
import { useNavigate } from "react-router-dom";

function UserDetails() {
  const [updateData, setUpdateData] = useState(false);
  const userDataInfo = useRecoilValue(userData);
  const [firstName, setFirstName] = useState(userDataInfo.firstName);
  const [lastName, setLastName] = useState(userDataInfo.lastName);
  const [password, setPassword] = useState(userDataInfo.password);
  const [userLoginInfo, setUserLoginInfo] = useRecoilState(userLogin);
  const navigate = useNavigate();
  if (!userLoginInfo) {
    return navigate("/");
  }

  const deleteAccount = async () => {
    let res = confirm("This process is irreversible. Are you sure?");
    if (res) {
      await axios.get("http://localhost:3000/api/v1/user/delete", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      navigate("/");
      setUserLoginInfo(false);
    } else {
      return;
    }
  };

  const updateUserData = async () => {
    setUpdateData(true);
    await axios.put(
      "http://localhost:3000/api/v1/user",
      { firstName, lastName, password },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setUpdateData(false);
  };

  return (
    userDataInfo !== null && (
      <div className='w-2/5 mt-20 mx-auto flex flex-col items-center justify-center gap-5 bg-black p-5 rounded-md text-white'>
        <div className='flex gap-4 items-center'>
          <h2>Username:</h2>
          <input
            type='text'
            value={userDataInfo.username}
            readOnly
            className={`p-2 rounded-lg outline-none text-gray-500 bg-gray-300`}
          />
        </div>
        <div className='flex gap-4 items-center'>
          <h2>Password:</h2>
          <input
            type='text'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            readOnly={!updateData}
            className={`p-2 rounded-lg outline-none ${
              updateData ? "text-black" : "text-gray-500 bg-gray-300"
            }`}
          />
        </div>
        <div className='flex gap-4 items-center'>
          <h2>First Name:</h2>
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            readOnly={!updateData}
            className={`p-2 rounded-lg outline-none ${
              updateData ? "text-black" : "text-gray-500 bg-gray-300"
            }`}
          />
        </div>
        <div className='flex gap-4 items-center'>
          <h2>Last Name:</h2>
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            readOnly={!updateData}
            className={`p-2 rounded-lg outline-none ${
              updateData ? "text-black" : "text-gray-500 bg-gray-300"
            }`}
          />
        </div>
        <div className='flex items-center w-full gap-x-5'>
          <button
            className={`${
              updateData ? "bg-red-600" : " bg-green-600"
            } py-2 w-full text-center rounded-lg mt-5`}
            onClick={() => setUpdateData((prev) => !prev)}
          >
            {updateData ? "Cancel" : "Update"}
          </button>
          <button
            className={`${
              updateData ? "bg-green-600" : " bg-red-600"
            } py-2 w-full text-center rounded-lg mt-5`}
            onClick={updateData ? updateUserData : deleteAccount}
          >
            {updateData ? "Confirm" : "Delete Account"}
          </button>
        </div>
      </div>
    )
  );
}

export default UserDetails;
