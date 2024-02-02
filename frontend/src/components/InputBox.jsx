import React from "react";

function InputBox({ label, placeholder, onChange }) {
  return (
    <div>
      <div className='text-sm font-medium text-left py-2'>{label} :</div>
      <input
        onChange={onChange}
        placeholder={placeholder}
        className='w-full px-2 py-1 border rounded text-black border-slate-200 outline-none focus:border focus:border-black'
      />
    </div>
  );
}

export default InputBox;
