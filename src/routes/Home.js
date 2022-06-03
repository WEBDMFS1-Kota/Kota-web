import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotjar } from '@fortawesome/free-brands-svg-icons';
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';

import NavbarBeforeLogin from '../components/NavbarBeforeLogin';
import NavbarAfterLogin from '../components/NavbarAfterLogin';

function StatusLogin({ islogged }) {
  if (islogged) {
    return <NavbarAfterLogin />;
  }
  return <NavbarBeforeLogin />;
}

function Home() {
  const display = false;
  return (
    <>
      <StatusLogin islogged={display} />
      <div className="flex justify-center">
        <div className="bg-gray-700 mt-6 rounded py-3 flex justify-center w-96">
          <div className="flex">
            <button type="button" className="rounded-xl hover:bg-gray-600 py-1.5 px-2.5 mr-4">
              <div className="flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  <FontAwesomeIcon className="mr-3" icon={faHotjar} />
                  Hot
                </span>
              </div>
            </button>
            <button type="button" className="rounded-xl hover:bg-gray-600 py-1.5 px-2.5 ml-4">
              <div className="flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  <FontAwesomeIcon className="mr-3" icon={faRankingStar} />
                  Top
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
