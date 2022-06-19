import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams, useNavigate } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css';
import '../styles/project.css';
import { StatusLogin } from './Home';

function Project() {
  const display = false;
  const { projectID } = useParams();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});

  const navigate = useNavigate();

  async function fetchCreatorInfo() {
    console.log(project);
  }
  async function fetchProjectInfos() {
    const request = await fetch(`https://kota-api-prod.herokuapp.com/projects/${projectID}`, { method: 'GET' });
    if (request.status === 200) {
      const response = await request.json();
      setProject(response);
      await fetchCreatorInfo();
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
        <StatusLogin islogged={display} />
        <section className="min-h-full flex flex-grow items-center justify-center">
          <h1 className="text-3xl text-white">Loading...</h1>
        </section>
      </div>
    );
  }

  return (
    <div>
      <StatusLogin islogged={display} />
      <section className="text-white bg-gray-900">
        <div className="w-1/2 mx-auto">
          <div className="py-10 text-center">
            <h1 className="text-6xl">{project.title}</h1>
          </div>
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
              <img className="border-2 border-black rounded-full h-auto w-24" src="https://image.winudf.com/v2/image1/Y29tLm1uaWRlbmMuYXZ0YXJtYWtlcl9zY3JlZW5fNF8xNTU0NjQ5MzE4XzAwMw/screen-4.jpg?fakeurl=1&type=.webp" alt="avatar" />
            </div>
            <div className="col-span-2 my-auto">
              <h3 className="text-3xl">Elouan MAILLY</h3>
              <p>Je suis la description de l&apos;utilisateur</p>
            </div>
            <div className="my-auto">
              <button type="button" className="rounded-md p-2 border border-white float-right">Voir le profil</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Project;
