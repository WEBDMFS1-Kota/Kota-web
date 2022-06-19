import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function SkeletonProjectCard() {
  return (
    <div className="grid grid-cols-1 my-2 mx-12 justify-items-center">
      <div className="bg-gray-700 text-white w-96 rounded-lg overflow-hidden shadow-xl my-2">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2" />
          <div className="h-8 bg-slate-800 w-1/2 mb-2 animate-pulse" />
          <div className="h-4 bg-slate-800 animate-pulse" />
          <div className="h-4 bg-slate-800 w-3/4 animate-pulse" />
        </div>
        <div className="flex px-6 py-4">
          <button type="button" className=" rounded-xl hover:bg-gray-600 py-1.5 px-2.5">
            <div className="grid grid-cols-2">
              <span className="bg-grey-lighter rounded-full px-1 py-1 text-sm font-semibold text-grey-darker mr-2"><FontAwesomeIcon icon={faArrowUp} /></span>
              <div className="h-4 bg-slate-800 animate-pulse my-auto" />
            </div>
          </button>
          <button type="button" className="rounded-xl hover:bg-gray-600 py-1.5 px-2.5">
            <div className="grid grid-cols-2">
              <span className="inline-block bg-grey-lighter rounded-full px-1 py-1 text-sm font-semibold text-grey-darker mr-2"><FontAwesomeIcon icon={faArrowDown} /></span>
              <div className="h-4 bg-slate-800 animate-pulse my-auto" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SkeletonProjectCard;
