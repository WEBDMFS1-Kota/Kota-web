import React from 'react';

function UserInfosSkeleton() {
  return (
    <div className="px-4">
      <div className="flex flex-row rounded-lg border border-gray-600/80 bg-gray-700 mt-6 p-6 shadow-xl">
        <div className="relative">
          <div className="w-40 h-40 bg-slate-800 rounded-full object-cover animate-pulse" />
        </div>
        <div className="flex flex-col px-6 w-1/3">
          <div className="">
            <div className="w-full h-12 bg-slate-800 animate-pulse" />
          </div>
          <div className="my-2 flex flex-col">
            <div className="flex flex-row">
              <div className="w-1/2 h-6 bg-slate-800 animate-pulse" />
            </div>
            <div className="w-full animate-pulse" />
            <div className="flex flex-row">
              <div className="w-4/5 mt-1 h-6 bg-slate-800 animate-pulse" />
            </div>
            <div className="w-3/4 h-6 mt-1 bg-slate-800 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfosSkeleton;
