import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotjar } from '@fortawesome/free-brands-svg-icons';
import { faRankingStar, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

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
        <div className="bg-gray-700 mt-6 rounded shadow-xl py-3 flex justify-center w-96">
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
      <div className="grid grid-cols-1 my-10 mx-12 justify-items-center">
        <div className="bg-gray-700 text-white w-96 rounded-lg overflow-hidden shadow-xl my-2">
          <img className="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p className="text-grey-darker text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
            </p>
          </div>
          <div className="flex px-6 py-4">
            <button type="button" className=" rounded-xl hover:bg-gray-600 py-1.5 px-2.5">
              <span className="inline-block bg-grey-lighter rounded-full px-1 py-1 text-sm font-semibold text-grey-darker mr-2"><FontAwesomeIcon icon={faArrowUp} /></span>
              <span className="inline-block bg-grey-lighter rounded-full text-sm font-semibold text-grey-darker">420</span>
            </button>
            <button type="button" className="rounded-xl hover:bg-gray-600 py-1.5 px-2.5">
              <span className="inline-block bg-grey-lighter rounded-full px-1 py-1 text-sm font-semibold text-grey-darker mr-2"><FontAwesomeIcon icon={faArrowDown} /></span>
              <span className="inline-block bg-grey-lighter rounded-full text-sm font-semibold text-grey-darker">3</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
