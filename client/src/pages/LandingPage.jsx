import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import HomeLayout from '../layouts/HomeLayout';
import TaskPage from './create/task';


const LandingPage = () => {

  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = authState.isLoggedIn ? `${authState.user.name}'s tasks` : "Task Manager";
  }, [authState]);

  const backgroundStyle = {
    backgroundImage: 'url("/img195.jpg")',
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  return (
    <>
      <HomeLayout>
      {!isLoggedIn ? (
        <div className='bg-primary text-blue h-[40vh] py-8 text-center' style={backgroundStyle}>
          <h1 className='text-2xl'> Welcome to Task Manager App</h1>
          <br/>
          <h1 className='text-2xl'> Task Manager brings all your tasks, teammates, and tools together</h1>
          <Link to="/signup" className='mt-10 text-xl block space-x-2 hover:space-x-4'>
            <span className='transition-[margin]'>Join now to organize your tasks</span>
            <span className='relative ml-4 text-base transition-[margin]'>
              <i className="fa-solid fa-arrow-right"></i>
            </span>
          </Link>
          <br/>
          <h3 className='text-2xl'> Workflows for any project, big or small</h3>
        </div>
      ) : (
        <>
          <h1 className='text-lg mt-8 mx-8 border-b border-b-gray-300'>Welcome {authState.user.firstName}</h1>
            <TaskPage/>
          </>
        )}
      </HomeLayout>
    </>
  )
}

export default LandingPage