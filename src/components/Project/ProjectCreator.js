import React from 'react';
import { NavLink } from 'react-router-dom';

function ProjectCreator(props) {
  const { projectCreator } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 mt-10 px-10 pb-10">
      <div className="col-span-1">
        <img className="border-2 border-black rounded-full h-auto w-36 md:w-24 mx-auto md:mx-0" src={projectCreator.avatar || `${process.env.PUBLIC_URL}/default-avatar.jpg`} alt="avatar" />
      </div>
      <div className="col-span-2 my-auto">
        <h3 className="text-3xl mb-2 text-center md:text-left">{projectCreator.pseudo}</h3>
        <h6 className="text-md italic my-4 md:my-0">{projectCreator.description}</h6>
      </div>
      <div className="my-auto">
        <NavLink to={`/user/${projectCreator.id}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800 disabled:hidden float-right">See profile</NavLink>
      </div>
    </div>
  );
}

export default ProjectCreator;
