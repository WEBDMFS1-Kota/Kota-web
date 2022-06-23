import React from 'react';
import '../styles/Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../store/userSlice';

function Navbar() {
  const pseudo = useSelector((state) => state.user.pseudo);
  const avatar = useSelector((state) => state.user.avatar);
  const userID = useSelector((state) => state.user.userID);
  const isLogged = useSelector((state) => state.user.isLogged);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function signOut() {
    dispatch(logout());
    navigate('/', { replace: true });
  }

  return (
    <div className="rounded-none shadow-xl bg-gray-400 dark:bg-gray-700 flex justify-between w-full p-2 items-center text-black dark:text-white">
      <div className="flex justify-between  items-center space-x-3">
        <NavLink className="text-2xl leading-6 hover:text-white hover:dark:text-gray-300" to="/">Kota</NavLink>
      </div>
      {
        !isLogged
          && (
          <div aria-label="toggler" className="flex justify-center items-center">
            <div className=" relative inline-block">
              <NavLink to="/login" className="inline-flex justify-center hover:underline w-full leading-5 transition duration-150 ease-in-out rounded focus:outline-none px-5 py-2.5">Login</NavLink>
            </div>
          </div>
          )
      }
      {
        isLogged
          && (
          <div aria-label="toggler" className="flex justify-center items-center">
            <div className=" relative inline-block text-left dropdown">
              <button
                className="inline-flex justify-center w-full leading-5 transition duration-150 ease-in-out rounded-md focus:outline-none"
                type="button"
                aria-haspopup="false"
                aria-expanded="false"
                aria-controls=""
              >
                <span className="mr-3 my-auto text-xl hover:text-white hover:dark:text-gray-300">{pseudo}</span>
                <img className="rounded-full h-auto w-12" src={avatar} alt="avatar" />
              </button>
              <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
                <div className="absolute right-0 w-56 mt-2 origin-top-right bg-gray-400 dark:bg-gray-900 border border-gray-600 divide-y divide-gray-500 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
                  <div className="py-1">
                    <NavLink to={`/user/${userID}`} className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left hover:bg-gray-500 hover:dark:bg-gray-700 hover:text-white" role="menuitem">View profile</NavLink>
                    <NavLink to="/userSettings" className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left hover:bg-gray-500 hover:dark:bg-gray-700 hover:text-white" role="menuitem">Account settings</NavLink>
                  </div>
                  <div className="py-1">
                    <a href="/" className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left hover:bg-gray-500 hover:dark:bg-gray-700 hover:text-white" onClick={signOut} role="menuitem">Sign out</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )
      }
    </div>
  );
}
export default Navbar;
