import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import Select from 'react-select';
import uploadImage from '../services/S3Service';
import customStyles from '../styles/reactSelect';

function AddProject() {
  const isLogged = useSelector((state) => state.user.isLogged);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectShortDescription, setProjectShortDescription] = useState('');
  const [projectImage, setProjectImage] = useState('');
  const [globalTags, setGlobalTags] = useState([]);
  const [projectTags, setProjectTags] = useState([]);

  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  const ProjectDescChange = useCallback((value) => {
    setProjectDescription(value);
  }, []);

  async function fetchTags() {
    const response = await fetch('https://kota-api-prod.herokuapp.com/tags', { method: 'GET' });
    if (response.ok) {
      const tags = await response.json();
      const tempoTagArray = [];
      tags.forEach((tag) => {
        tempoTagArray.push({
          value: tag.id,
          label: tag.name,
        });
      });
      setGlobalTags(tempoTagArray);
    }
  }

  function loadMDFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.md,.txt';
    input.onchange = (e) => {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');

      reader.onload = (readerEvent) => {
        const content = readerEvent.target.result;
        setProjectDescription(content);
      };
    };
    input.click();
  }

  function selectImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.jpg,.jpeg,.png,.svg,.webp,.gif,.avif';
    input.onchange = (e) => {
      const file = e.target.files[0];

      uploadImage('projectImages', file).then((imageURL) => {
        if (imageURL) {
          setProjectImage(imageURL);
        }
      });
    };
    input.click();
  }

  async function createProject() {
    const sentProjectTags = [];

    projectTags.forEach((projectTag) => {
      sentProjectTags.push({
        id: projectTag.value,
        name: projectTag.label,
      });
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: projectTitle,
        image: projectImage,
        shortDescription: projectShortDescription,
        description: projectDescription,
        projectTags: sentProjectTags,
      }),
    };
    const response = await fetch('https://kota-api-prod.herokuapp.com/projects', requestOptions);
    if (response.ok) {
      const { id } = await response.json();
      navigate(`/project/${id}`, { replace: false });
    }
  }

  useEffect(() => {
    if (!isLogged) navigate('/login', { replace: true });
    fetchTags();
  }, []);

  return (
    <section className="text-white bg-gray-900 px-4 md:px-0">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 max-w-screen-xl px-4 py-4 md:py-16 my-16 mx-auto">
        <div className="mx-auto text-center">
          <h1 className="text-4xl md:text-6xl">
            Create a project
          </h1>
        </div>
        <div className="my-10">
          <div className="text-center md:text-right">
            <button type="button" className="w-2/3 md:w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800 disabled:hidden" onClick={loadMDFile}>
              Import a README file
            </button>
            <button type="button" className="mt-2 md:mt-0 w-2/3 md:w-fit mx-2 p-2 border-2 border-white rounded-lg hidden">
              Preview result
            </button>
            <button
              type="button"
              className="w-2/3 mt-2 md:mt-0 w-2/3 md:w-fit ml-0 md:ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800 disabled:hidden"
              onClick={createProject}
            >
              Create project
            </button>
          </div>
        </div>
        <div>
          <label
            htmlFor="projectTitle"
            className="text-lg font-medium text-black block dark:text-white"
          >
            Project Title
            <input
              type="text"
              name="projectTitle"
              id="projectTitle"
              maxLength="50"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Name of the project"
              onChange={(e) => setProjectTitle(e.target.value)}
              required=""
            />
            <span className="ml-2 text-sm italic">
              {projectDescription.length}
              {' '}
              / 50 characters
            </span>
          </label>
        </div>
        <div className="mt-4 w-full">
          <label
            htmlFor="projectShortDescription"
            className="text-lg font-medium text-black block dark:text-white"
          >
            Short description
            <input
              type="text"
              name="projectShortDescription"
              id="projectShortDescription"
              maxLength="100"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="This is a project for..."
              onChange={(e) => setProjectShortDescription(e.target.value)}
              required=""
            />
            <span className="ml-2 text-sm italic">
              {projectShortDescription.length}
              {' '}
              / 100 characters
            </span>
          </label>
        </div>
        <div className="mt-4 w-full">
          <h1
            className="text-lg font-medium text-gray-900 block dark:text-gray-300 mb-5"
          >
            Image of the project (optional)
          </h1>
          <div className="w-full text-center">
            {
              projectImage
                && (
                <img src={projectImage} alt="projectImage" className="mb-4 mx-auto h-auto w-full md:w-1/2" />
                )
            }
            <button type="button" className="w-2/3 md:w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800 disabled:hidden" onClick={selectImage}>Upload image</button>
          </div>
          <input type="hidden" onChange={(e) => setProjectImage(e.target.value)} />
        </div>
        <div className="mt-4">
          <h1
            className="text-lg font-medium text-gray-900 block dark:text-gray-300 mb-5"
          >
            Description of the project
          </h1>
          <SimpleMDE className="bg-transparent" onChange={ProjectDescChange} value={projectDescription} />
        </div>
        <div className="mb-32">
          <h1 className="text-lg font-medium text-gray-900 block dark:text-gray-300 mb-5">
            Tags of the project
          </h1>
          <Select
            isMulti
            closeMenuOnSelect={false}
            onChange={(e) => setProjectTags(e)}
            options={globalTags}
            styles={customStyles}
          />
        </div>
      </div>
    </section>
  );
}

export default AddProject;
