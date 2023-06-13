import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import SigninForm from '../../components/auth/SigninForm';
import HomeLayout from '../../layouts/HomeLayout';

const Signin = () => {
  const { state } = useLocation();
  const redirectUrl = state?.redirectUrl || null;

  useEffect(() => {
    document.title = "Signin";
  }, []);

  return (
    <>
      <HomeLayout>
        <SigninForm redirectUrl={redirectUrl} />
      </HomeLayout>
    </>
  )
}

export default Signin