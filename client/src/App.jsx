import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import Task from './pages/Task';
import Profile from './pages/profile';
import Error from './pages/auth/error';
import { saveProfile } from "./store/actions/authActions";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App(){
  const authState = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    dispatch(saveProfile(token));
  }, [authState.isLoggedIn, dispatch]);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <LandingPage/>}/>
          {/* <Route path='/home' element={<Home/>}/> */}
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/task' element={<Task/>}/>
          <Route path='*' element={<Error/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
    );
}

export default App;