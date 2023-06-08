import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import LoginForm from '../../components/Auth/LoginForm';
import HomeLayout from '../../layouts/HomeLayout';

const Login = () => {
  const { state } = useLocation();
  const redirectUrl = state?.redirectUrl || null;

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <>
      <HomeLayout>
        <LoginForm redirectUrl={redirectUrl} />
      </HomeLayout>
    </>
  )
}

export default Login