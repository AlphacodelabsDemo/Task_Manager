import React from 'react';
import HomeLayout from '../layouts/HomeLayout';

const Error = () => {
    return(
    <HomeLayout>
       <div className='w-full py-16 text-center'>
          <h1> 404 Error Not Found</h1>
          <h2> The page you are trying to access is not available.</h2>
       </div>
    </HomeLayout>
    )
}

export default Error