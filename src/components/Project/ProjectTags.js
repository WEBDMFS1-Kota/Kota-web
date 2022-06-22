import React from 'react';

function ProjectTags(props) {
  const { projectTags } = props;
  return (
    <div className="flex">
      {
          projectTags.map((tag) => (
            <div className="py-1 px-3 mx-1 bg-blue-500 rounded-full">
              <p>{tag.name}</p>
            </div>
          ))
        }
    </div>
  );
}

export default ProjectTags;
