import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';

function ProjectContent(props) {
  const userID = useSelector((state) => state.user.userID);
  const { projectID } = useParams();
  const {
    project, creatorID,
  } = props;

  return (
    <div>
      {
            project.image
            && (
            <div>
              <img src={project.image} alt="projectMain" className="h-auto mx-auto" />
            </div>
            )
        }
      <div className="my-10 text-center">
        <h1 className="text-5xl">{project.title}</h1>
      </div>
      <div className="text-center text-lg">
        <p>{project.shortDescription}</p>
      </div>
      {
            creatorID === userID
            && (
            <div className="my-5">
              <NavLink to={`/project/${projectID}/modify`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800 disabled:hidden">Modify</NavLink>
            </div>
            )
        }
      <div>
        <ReactMarkdown
              /* eslint-disable-next-line react/no-children-prop */
          children={project.description}
          remarkPlugins={[remarkGfm]}
          className="markdown-body"
        />
      </div>
    </div>
  );
}

export default ProjectContent;
