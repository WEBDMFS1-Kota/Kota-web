import React from 'react';

function ProjectContentSkeleton() {
  return (
    <div>
      <div className="h-64 w-3/4 mx-auto bg-slate-500 animate-pulse" />
      <div className="h-20 mt-4 mx-auto w-4/5 bg-slate-500 animate-pulse" />
      <div className="h-8 mt-4 mx-auto w-2/3 bg-slate-500 animate-pulse" />
      <div className="h-8 mx-auto w-1/2 bg-slate-500 animate-pulse" />
      <div className="h-96 mt-4 w-full bg-slate-500 animate-pulse" />
    </div>
  );
}

export default ProjectContentSkeleton;
