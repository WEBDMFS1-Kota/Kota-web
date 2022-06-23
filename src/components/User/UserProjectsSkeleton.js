import React from 'react';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function UserProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {
        [...Array(4)].map((value, index) => (
          <div className="px-4 mt-2" key={`skeletonProject${index * 2}`}>
            <div className="bg-gray-400 dark:bg-gray-700 text-black dark:text-white rounded-lg overflow-hidden shadow-xl my-4">
              <div className="px-6 py-4">
                <div className="w-2/3 h-10 bg-slate-600 dark:bg-slate-800 animate-pulse" />
                <div className="w-full h-6 mt-2 bg-slate-600 dark:bg-slate-800 animate-pulse" />
                <div className="w-1/2 h-6 bg-slate-600 dark:bg-slate-800 animate-pulse" />
              </div>
              <div className="grid grid-cols-2 px-6 py-4 gap-x-1">
                <button type="button" className=" rounded-xl hover:bg-gray-600 py-1.5">
                  <div className="grid grid-cols-2">
                    <span className="bg-grey-lighter rounded-full py-1 text-sm font-semibold text-grey-darker"><FontAwesomeIcon icon={faArrowUp} /></span>
                    <div className="h-6 w-3/4 bg-slate-600 dark:bg-slate-800 animate-pulse my-auto" />
                  </div>
                </button>
                <button type="button" className="rounded-xl hover:bg-gray-600 py-1.5">
                  <div className="grid grid-cols-2">
                    <span className="inline-block bg-grey-lighter rounded-full px-1 py-1 text-sm font-semibold text-grey-darker"><FontAwesomeIcon icon={faArrowDown} /></span>
                    <div className="h-6 w-3/4 bg-slate-600 dark:bg-slate-800 animate-pulse my-auto" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))
        }
    </div>
  );
}

export default UserProjectsSkeleton;
