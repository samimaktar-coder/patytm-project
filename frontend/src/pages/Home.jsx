import React from "react";
import HomeImg from "../assets/transfer-money.png";

function Home() {
  return (
    <div className='flex items-center justify-center gap-5 px-10'>
      <div className='basis-1/2'>
        <img src={HomeImg} alt='home-img' className='w-full' />
      </div>
      <h1 className='basis-1/2 text-6xl leading-[4rem] font-semibold'>
        Seamless <span className='text-blue-500'>Transactions</span>, Secure
        Solutions: Empowering Your{" "}
        <span className='text-blue-500'>Payments</span>, Elevating Your
        Experience!
      </h1>
    </div>
  );
}

export default Home;
