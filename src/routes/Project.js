import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css';
import '../styles/project.css';

function Project() {
  const { projectID } = useParams();
  const userID = useSelector((state) => state.user.userID);
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const [projectCreator, setProjectCreator] = useState({});
  const [projectTags, setProjectTags] = useState([]);

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
      await fetchCreatorInfo();
      await fetchProjectTags();
    } else {
      navigate('/project/notfound', { replace: true });
    }
  }

  useEffect(() => {
    fetchProjectInfos().then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="min-h-full flex flex-grow items-center justify-center">
          <h1 className="text-3xl text-white">Loading...</h1>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="text-white bg-gray-900">
        <div className="w-1/2 mx-auto">
          <div className="my-10 text-center">
            <h1 className="text-5xl">{project.title}</h1>
          </div>
          <div className="text-center text-lg">
            <p>{project.shortDescription}</p>
          </div>
          <div className="flex space-x-1 my-2">
            {
              projectTags.map((tag) => (
                <div className="py-1 px-3 bg-blue-500 rounded-full">
                  <p>{tag.name}</p>
                </div>
              ))
            }
          </div>
          {
              projectCreator.id === userID
              && (
              <div className="my-5">
                <NavLink to={`/project/${projectID}/modify`} className="p-2 border-2 border-white rounded-lg">Modify</NavLink>
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
          <div className="grid grid-cols-4 mt-10 px-10 pb-10">
            <div className="col-span-1">
              <img className="border-2 border-black rounded-full h-auto w-24" src={projectCreator.avatar || `${process.env.PUBLIC_URL}/default-avatar.jpg`} alt="avatar" />
            </div>
            <div className="col-span-2 my-auto">
              <h3 className="text-3xl mb-2">{projectCreator.pseudo}</h3>
              <h6 className="text-md italic">{projectCreator.description}</h6>
            </div>
            <div className="my-auto">
              <NavLink to={`/user/${projectCreator.id}`} className="rounded-md p-2 border border-white float-right">Voir le profil</NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Project;
