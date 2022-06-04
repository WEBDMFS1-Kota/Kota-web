import React from 'react';
import './NavbarAfterLogin.css';

function NavbarAfterLogin() {
  return (
    <div className="rounded-none shadow-xl bg-gray-900 flex justify-between w-full p-2 items-center ">
      <div className="flex justify-between  items-center space-x-3">
        <p className="text-2xl leading-6 text-white">Kota</p>
      </div>
      <div aria-label="toggler" className="flex justify-center items-center">
        <span className="text-white mr-3">Profile Name</span>
        <div className=" relative inline-block text-left dropdown">
          <button
            className="inline-flex justify-center w-full leading-5 transition duration-150 ease-in-out rounded-md focus:outline-none"
            type="button"
            aria-haspopup="false"
            aria-expanded="false"
            aria-controls=""
          >
            <img className="rounded-full" src="https://i.ibb.co/L1LQtBm/Ellipse-1.png" alt="avatar" />
          </button>
          <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
            <div className="absolute right-0 w-56 mt-2 origin-top-right bg-gray-900 border border-gray-600 divide-y divide-gray-500 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
              <div className="py-1">
                <a href="/" className="text-white flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem">View profile</a>
                <a href="/" className="text-white flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem">Account settings</a>
              </div>
              <div className="py-1">
                <a href="/" className="text-white flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem">Sign out</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarAfterLogin;
