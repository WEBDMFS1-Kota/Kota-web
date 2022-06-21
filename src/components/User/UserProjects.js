import React from 'react';
import UserProjectCard from './UserProjectCard';

function UserProjects(props) {
  const { projects } = props;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => <UserProjectCard project={project} />)}
    </div>
  );
}

export default UserProjects;
