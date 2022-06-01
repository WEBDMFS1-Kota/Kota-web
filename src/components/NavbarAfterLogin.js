import React from 'react';
import './NavbarAfterLogin.css';

function NavbarAfterLogin() {
  return (
    <header className="bg-gray-900">
      <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="md:flex md:items-center md:gap-12">
            <a className="block text-white" href="/">
              <span>Kota</span>
            </a>
          </div>
          <div className="hidden md:block">
            <nav aria-labelledby="header-navigation">
              <h2 className="sr-only" id="header-navigation">Header navigation</h2>
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a className="text-white transition hover:text-white/75" href="/">
                    Hot
                  </a>
                </li>
                <li>
                  <a className="text-white transition hover:text-white/75" href="/">
                    Top
                  </a>
                </li>
                <li>
                  <a className="text-white transition hover:text-white/75" href="/">
                    All projects
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center p-12">
              <div className=" relative inline-block text-left dropdown">
                <span className="rounded-md shadow-sm">
                  <button
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out border border-blue-600 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                    type="button"
                    aria-haspopup="true"
                    aria-expanded="true"
                    aria-controls="headlessui-menu-items-117"
                  >
                    <span>Profile name</span>
                    <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  </button>
                </span>
                <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
                  <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
                    <div className="px-4 py-3">
                      <p className="text-sm leading-5">Signed in as</p>
                      <p className="text-sm font-medium leading-5 text-gray-900 truncate">tom@example.com</p>
                    </div>
                    <div className="py-1">
                      <a href="/" className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem">Account settings</a>
                      <a href="/" className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem">My projects</a>
                    </div>
                    <div className="py-1">
                      <a href="/" className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem">Sign out</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavbarAfterLogin;
