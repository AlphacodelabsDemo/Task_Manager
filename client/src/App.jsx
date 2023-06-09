import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import Home from './pages/home';
import Signup from './pages/signup';
import Login from './pages/login';
import Profile from './pages/profile';
import Task from './pages/task';
import Projects from './pages/projects';
import Error from './pages/error';
import { saveProfile } from "./redux/actions/auth-actions";
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
          <Route path='/' element={ <Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Login/>} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/projects' element={ <Projects/>}/>
          <Route path='/tasks' element={ <Task/>}/>
          <Route path='*' element={<Error/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;