import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userLogin } from "../atom/userLogin";
import SendSuccessFully from "../assets/money.gif";

function SendMoney() {
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const userLoginData = useRecoilValue(userLogin);
  const navigate = useNavigate();

  if (!userLoginData) {
    return navigate("/");
  }

  const sendMoneyFunc = async () => {
    axios.post(
      "http://localhost:3000/api/v1/account/transfer",
      {
        to: id,
        amount,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setSuccess(true);

    setTimeout(() => {
      navigate("/dashboard");
      setSuccess(false);
    }, 1700);
  };

  return !success ? (
    <div className='w-1/3 bg-black text-white mx-auto mt-20 rounded-lg'>
      <div className='h-full flex flex-col justify-center w-full'>
        <div>
          <div className='flex flex-col space-y-1.5 p-6'>
            <h2 className='text-3xl font-bold text-center'>Send Money</h2>
          </div>
          <div className='p-6'>
            <div className='flex items-center space-x-4'>
              <div className='w-12 h-12 rounded-full bg-green-500 flex items-center justify-center'>
                <span className='text-2xl text-white'>
                  {name[0].toUpperCase()}
                </span>
              </div>
              <h3 className='text-2xl font-semibold'>{name}</h3>
            </div>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <label
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  htmlFor='amount'
                >
                  Amount (in Rs)
                </label>
                <input
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  type='number'
                  className='flex h-10 w-full rounded-md border border-input bg-background text-black px-3 py-2 text-sm outline-none'
                  id='amount'
                  placeholder='Enter amount'
                />
              </div>
              <button
                onClick={sendMoneyFunc}
                className='justify-center rounded-md text-lg font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-600 text-white'
              >
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <img src={SendSuccessFully} alt='' className='mx-auto mt-20' />
    </div>
  );
}

export default SendMoney;