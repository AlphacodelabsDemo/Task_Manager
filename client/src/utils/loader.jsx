import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-8 h-8 my-8 mx-auto">
      <div className="w-full h-full rounded-full border-4 border-indigo-600 border-b-0 animate-spin"></div>
    </div>
  );
};

export default Loader;
