import React from 'react';

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
            <div className="sm:gap-4 sm:flex">
              <a
                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-md shadow"
                href="/"
              >
                Login
              </a>
              <div className=" sm:flex">
                <a
                  className="px-5 py-2.5 text-sm font-medium text-white bg-gray-800 rounded-md"
                  href="/"
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavbarAfterLogin;