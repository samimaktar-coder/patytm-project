import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useRecoilValue } from "recoil";
import { userData } from "../atom/userData";

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className='flex justify-between'>
      <div className='flex'>
        <div className='rounded-full h-12 w-12 bg-blue-600 flex justify-center mt-1 mr-2'>
          <div className='flex flex-col justify-center h-full text-xl'>
            {user.firstName[0]}
          </div>
        </div>
        <div className='flex flex-col justify-center h-ful'>
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-center h-ful'>
        <Button
          onClick={(e) => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}

function Users() {
  // Replace with backend call
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const userDataInfo = useRecoilValue(userData);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <>
      <div className='font-bold mt-6 text-lg'>Users</div>
      <div className='my-2'>
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type='text'
          placeholder='Search users...'
          className='w-full px-2 py-1 border rounded text-black outline-none border-slate-200'
        ></input>
      </div>
      <div>
        {userDataInfo !== null &&
          users.map(
            (user) =>
              user._id !== userDataInfo._id && (
                <User key={user._id} user={user} />
              )
          )}
      </div>
    </>
  );
}

export default Users;