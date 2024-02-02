import React from "react";
import { useRecoilValue } from "recoil";
import { userData } from "../atom/userData";

function Appbar() {
  const userDataInfo = useRecoilValue(userData);

  return (
    <div className='shadow h-14 flex justify-between items-center'>
      <div className='font-bold italic text-lg ml-4'>
        PAY<span className='text-blue-500'>KARO</span>
      </div>
      <div className='flex items-center'>
        <div className='flex flex-col justify-center h-full mr-4'>Hello</div>
        <div className='rounded-full h-12 w-12 bg-blue-600 font-bold flex justify-center mt-1 mr-2'>
          <div className='flex flex-col justify-center h-full text-xl'>
            {userDataInfo !== null && userDataInfo.firstName[0]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appbar;
