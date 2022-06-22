import React from 'react';

function ProjectCreatorSkeleton() {
  return (
    <div className="grid grid-cols-4 mt-10 px-10 pb-10">
      <div className="col-span-1">
        <div className="w-24 h-24 bg-slate-500 animate-pulse" />
      </div>
      <div className="col-span-2 my-auto">
        <div className="h-8 bg-slate-500 animate-pulse w-1/2" />
        <div className="h-6 mt-2 bg-slate-500 animate-pulse w-1/2" />
        <div className="h-6 bg-slate-500 animate-pulse w-1/3" />
      </div>
    </div>
  );
}

export default ProjectCreatorSkeleton;
