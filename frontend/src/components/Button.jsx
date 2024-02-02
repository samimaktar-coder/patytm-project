import React from "react";

function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      type='button'
      className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-2 py-2 me-2 mb-2'
    >
      {label}
    </button>
  );
}

export default Button;
