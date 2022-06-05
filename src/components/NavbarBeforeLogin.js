import React from 'react';

function NavbarBeforeLogin() {
  return (
    <div className="rounded-none shadow-xl bg-gray-900 flex justify-between w-full p-2 items-center ">
      <div className="flex justify-between  items-center space-x-3">
        <p className="text-2xl leading-6 text-white">Kota</p>
      </div>
      <div aria-label="toggler" className="flex justify-center items-center">
        <div className=" relative inline-block">
          <a href="/login">
            <button
              className="inline-flex justify-center text-white hover:underline w-full leading-5 transition duration-150 ease-in-out rounded focus:outline-none px-5 py-2.5"
              type="button"
              aria-haspopup="false"
              aria-expanded="false"
              aria-controls=""
            >
              login
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default NavbarBeforeLogin;
