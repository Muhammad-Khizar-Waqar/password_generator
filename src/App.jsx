import React, { useEffect, useCallback, useState, useRef } from "react";

const App = () => {
 const [length, setLength] = useState(8);
 const [password, setPassword] = useState("");
 const [addNum, setAddNum] = useState(false);
 const [addChart, setAddChart] = useState(false);

 const copyPassword = useRef(null);

 const passwordGenerator = useCallback(() => {
  let pass = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if (addNum) {
   str += "0123456789";
  }
  if (addChart) {
   str += "!@#$%^&*()_{}`";
  }
  for (let index = 1; index <= length; index++) {
   let char = Math.floor(Math.random() * str.length + 1);
   pass += str.charAt(char);
  }
  setPassword(pass);
 }, [length, addNum, addChart, setPassword]);

 const copyToCLipBtn = useCallback(() => {
  copyPassword.current?.select(),
   window.navigator.clipboard.writeText(password);
 }, [password]);

 useEffect(() => {
  passwordGenerator();
 }, [length, addChart, addNum, passwordGenerator]);

 return (
  <div className='bg-slate-900 text-slate-300 w-full h-screen mx-auto p-4'>
   <form className='backdrop-sepia-0 bg-white/30 max-w-lg mx-auto p-4'>
    <div className='flex align-middle justify-between'>
     <input
      className='p-2 flex-1'
      type='text'
      name='CopyNumber'
      id='CopyNumber'
      placeholder='Password'
      value={password}
      ref={copyPassword}
      readOnly
     />
     <button
      className='bg-slate-900 p-2'
      onClick={copyToCLipBtn}
      type='button'
      value='Copy'>
      Copy
     </button>
    </div>
    <div className=' bg-transparent flex align-middle justify-start  py-2'>
     <input
      type='range'
      onChange={(e) => setLength(e.target.value)}
      min={8}
      max={20}
      value={length}
     />
     <label className='pr-2'>Length: {length}</label>
     <input
      type='checkbox'
      name='addNumber'
      id='addNumber'
      value={addNum}
      onChange={() => {
       setAddNum((prev) => !prev);
      }}
     />
     <label className='pr2'>Numbers</label>

     <input
      type='checkbox'
      name='addChart'
      id='addChart'
      value={addChart}
      onChange={() => {
       setAddChart((prev) => !prev);
      }}
     />
     <label className='pr-2'>Characters</label>
    </div>
   </form>
  </div>
 );
};

export default App;
