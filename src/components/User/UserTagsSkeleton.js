import React from 'react';

function UserTagsSkeleton() {
  return (
    <div className="flex">
      {
          [...Array(5)].map((value, index) => (
            <div className="py-1 px-3 mx-1 bg-blue-500 rounded-full h-8 w-24 animate-pulse" key={`projectTagsSkeleton-${index - 1}`} />
          ))
        }
    </div>
  );
}

export default UserTagsSkeleton;
