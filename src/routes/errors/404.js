import React from 'react';

function NotFoundError() {
  return (
    <section className="text-white">
      <div className="max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
            404
          </h1>
        </div>
      </div>
    </section>
  );
}

export default NotFoundError;
