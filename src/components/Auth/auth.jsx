import React, { useState } from 'react';
import Login from './login';
import { Register } from './register';


const Auth = () => {
  const [page, setPage]= useState(false);
  return (

    <>
      { page === false ? <Login setPage={setPage}/> : <Register setPage={setPage}/>}
    </>
  );
}

export default Auth;
