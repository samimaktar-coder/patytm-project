import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userLogin } from "../atom/userLogin";
import { useNavigate } from "react-router-dom";
import { userData } from "../atom/userData";

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const userLoginData = useRecoilValue(userLogin);
  const setUserData = useSetRecoilState(userData);
  const navigate = useNavigate();

  if (!userLoginData) {
    navigate("/");
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => setBalance(res.data.balance));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/details", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => setUserData(res.data.user));
  }, []);

  return (
    <div className='p-4 w-[33%] max-w-[50%] bg-black text-white mx-auto mt-10 rounded-xl'>
      <Appbar />
      <div className='m-8'>
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
}

export default Dashboard;
