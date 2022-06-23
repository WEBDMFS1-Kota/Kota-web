import React from 'react';
import UserProjectCard from './UserProjectCard';

function UserProjects(props) {
  const { projects, userID } = props;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => <UserProjectCard project={project} key={`project-${project.id}-card`} userID={userID} />)}
    </div>
  );
}

export default UserProjects;
