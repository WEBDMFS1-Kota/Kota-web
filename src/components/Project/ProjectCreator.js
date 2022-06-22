import React from 'react';
import { NavLink } from 'react-router-dom';

function ProjectCreator(props) {
  const { projectCreator } = props;

  return (
    <div className="grid grid-cols-4 mt-10 px-10 pb-10">
      <div className="col-span-1">
        <img className="border-2 border-black rounded-full h-auto w-24" src={projectCreator.avatar || `${process.env.PUBLIC_URL}/default-avatar.jpg`} alt="avatar" />
      </div>
      <div className="col-span-2 my-auto">
        <h3 className="text-3xl mb-2">{projectCreator.pseudo}</h3>
        <h6 className="text-md italic">{projectCreator.description}</h6>
      </div>
      <div className="my-auto">
        <NavLink to={`/user/${projectCreator.id}`} className="rounded-md p-2 border border-white float-right">See profile</NavLink>
      </div>
    </div>
  );
}

export default ProjectCreator;
