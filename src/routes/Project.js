import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'github-markdown-css';
import '../styles/project.css';
import ProjectContent from '../components/Project/ProjectContent';
import ProjectCreator from '../components/Project/ProjectCreator';
import ProjectTags from '../components/Project/ProjectTags';
import ProjectContentSkeleton from '../components/Project/skeletons/ProjectContentSkeleton';
import ProjectCreatorSkeleton from '../components/Project/skeletons/ProjectCreatorSkeleton';
import ProjectTagsSkeleton from '../components/Project/skeletons/ProjectTagsSkeleton';

function Project() {
  const { projectID } = useParams();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const [projectCreator, setProjectCreator] = useState({});
  const [projectTags, setProjectTags] = useState([]);

  const [projectCreatorLoading, setProjectCreatorLoading] = useState(true);
  const [projectTagsLoading, setProjectTagsLoading] = useState(true);

  const navigate = useNavigate();

  async function fetchProjectTags() {
    const response = await fetch(`https://kota-api-prod.herokuapp.com/projects/${projectID}/tags`, { method: 'GET' });
    if (response.ok) {
      const tags = await response.json();
      setProjectTags(tags);
    }
  }
  async function fetchCreatorInfo() {
    const request = await fetch(`https://kota-api-prod.herokuapp.com/users/${projectID}/projectCreator`, { method: 'GET' });
    if (request.ok) {
      const response = await request.json();
      setProjectCreator(response);
    }
  }
  async function fetchProjectInfos() {
    const request = await fetch(`https://kota-api-prod.herokuapp.com/projects/${projectID}`, { method: 'GET' });
    if (request.status === 200) {
      const response = await request.json();
      setProject(response);
      fetchCreatorInfo().then(() => setProjectCreatorLoading(false));
      fetchProjectTags().then(() => setProjectTagsLoading(false));
    } else {
      navigate('/project/notfound', { replace: true });
    }
  }

  useEffect(() => {
    fetchProjectInfos().then(() => setLoading(false));
  }, []);

  return (
    <div className="px-4 md:px-0">
      <section className="text-black dark:text-white bg-white shadow-md border bg-gray-400 border-gray-400 rounded-lg dark:bg-gray-800 dark:border-gray-700 max-w-screen-md px-4 py-4 md:py-16 my-16 mx-auto">
        {
          !loading
            ? (
              <ProjectContent
                project={project}
                projectTags={projectTags}
                projectTagsLoading={projectTagsLoading}
                creatorID={projectCreator.id}
              />
            )
            : (
              <ProjectContentSkeleton />
            )
        }
        <div className="my-5">
          {
            !projectTagsLoading
              ? (
                <ProjectTags projectTags={projectTags} />
              )
              : (
                <ProjectTagsSkeleton />
              )
          }
        </div>
        {
          !projectCreatorLoading
            ? (
              <ProjectCreator projectCreator={projectCreator} />
            )
            : (
              <ProjectCreatorSkeleton />
            )
        }
      </section>
    </div>
  );
}

export default Project;
