import React from 'react';

function ProjectTags(props) {
  const { projectTags } = props;
  return (
    <div className="flex flex-row flex-wrap gap-y-1">
      {
          projectTags.map((tag, index) => (
            <div className="py-1 px-3 mx-1 bg-blue-500 rounded-full" key={`projectTagsSkeleton-${index - 1}`}>
              <p>{tag.name}</p>
            </div>
          ))
        }
    </div>
  );
}

export default ProjectTags;
