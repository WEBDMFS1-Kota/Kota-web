import React from 'react';

function ProjectCreatorSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 mt-10 px-10 pb-10">
      <div className="col-span-1">
        <div className="w-36 md:w-24 h-36 md:h-24 mx-auto md:mx-0 rounded-full bg-slate-500 animate-pulse" />
      </div>
      <div className="col-span-2 mt-4 md:mt-0 my-auto">
        <div className="h-12 md:h-8 bg-slate-500 animate-pulse w-3/4 mx-auto md:mx-0" />
        <div className="h-4 mt-4 md:mt-2 bg-slate-500 animate-pulse w-full md:w-1/2" />
        <div className="h-4 bg-slate-500 animate-pulse w-2/3 md:w-1/3" />
      </div>
    </div>
  );
}

export default ProjectCreatorSkeleton;
