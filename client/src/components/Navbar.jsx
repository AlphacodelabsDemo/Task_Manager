import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/actions/authActions';
import CreateDropdown from './NavbarOptions/Create';

const Navbar = () => {
  const authState = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isCreateDropdownOpen, setIsCreateDropdownOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const toggleCreateDropdown = () => {
    setIsCreateDropdownOpen(!isCreateDropdownOpen);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <header className="flex justify-between sticky top-0 p-4 bg-white shadow-sm items-center">
        <h2 className="cursor-pointer uppercase font-medium">
          <Link to="/"> Task Manager </Link>
        </h2>

        {authState.isLoggedIn && (
          <button
            onClick={toggleCreateDropdown}
            className="py-2 px-3 cursor-pointer text-primary hover:bg-gray-200 transition rounded-sm bg-blue-500 text-white hover:bg-blue-600 font-medium"
          >
            Create
          </button>
        )}

        <ul className="hidden md:flex gap-4 uppercase font-medium">
          {authState.isLoggedIn ? (
            <>
              <li className="py-2 px-3 cursor-pointer hover:bg-gray-200 transition rounded-sm" onClick={handleLogoutClick}>
                Logout
              </li>
            </>
          ) : (
            <ul className="flex space-x-4">
              <li className="py-2 px-3 cursor-pointer text-primary hover:bg-gray-200 transition rounded-sm">
                <Link to="/signup">Join Now</Link>
              </li>
              <li className="py-2 px-3 cursor-pointer text-primary hover:bg-gray-200 transition rounded-sm">
                <Link to="/signin">Sign In</Link>
              </li>
            </ul>
          )}
        </ul>

        <span className="md:hidden cursor-pointer" onClick={toggleNavbar}>
          <i className="fa-solid fa-bars"></i>
        </span>

        {/* Navbar displayed as sidebar on smaller screens */}
        <div
          className={`absolute md:hidden right-0 top-0 bottom-0 transition ${
            isNavbarOpen === true ? 'translate-x-0' : 'translate-x-full'
          } bg-gray-100 shadow-md w-screen sm:w-9/12 h-screen`}
        >
          <div className="flex">
            <span className="m-4 ml-auto cursor-pointer" onClick={toggleNavbar}>
              <i className="fa-solid fa-xmark"></i>
            </span>
          </div>
          <ul className="flex flex-col gap-4 uppercase font-medium text-center">
            {authState.isLoggedIn ? (
              <>
                <li className="py-2 px-3 cursor-pointer hover:bg-gray-200 transition rounded-sm" onClick={handleLogoutClick}>
                  Logout
                </li>
              </>
            ) : (
              <ul>
                <li className="py-2 px-3 cursor-pointer text-primary hover:bg-gray-200 transition rounded-sm">
                  <Link to="/signup">Join Now</Link>
                </li>
                <li className="py-2 px-3 cursor-pointer text-primary hover:bg-gray-200 transition rounded-sm">
                  <Link to="/signin">Sign In</Link>
                </li>
              </ul>
            )}
          </ul>
        </div>
      </header>

      {isCreateDropdownOpen && <CreateDropdown />}
    </>
  );
};

export default Navbar;
