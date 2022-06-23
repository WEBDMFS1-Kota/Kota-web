import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'easymde/dist/easymde.min.css';
import Select from 'react-select';
import uploadImage from '../services/S3Service';
import { isEqual } from '../utils';
import customStyles from '../styles/reactSelect';

function ModifyProject() {
  const { projectID } = useParams();
  const isLogged = useSelector((state) => state.user.isLogged);
  const userID = useSelector((state) => state.user.userID);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectShortDescription, setProjectShortDescription] = useState('');
  const [projectImage, setProjectImage] = useState('');
  const [globalTags, setGlobalTags] = useState([]);
  const [initialProjectTags, setInitialProjectTags] = useState([]);
  const [projectTags, setProjectTags] = useState([]);
  const [project, setProject] = useState({});

  const changedInfos = () => toast.success('Project infos updated');

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

  async function fetchProjectTags() {
    const response = await fetch(`https://kota-api-prod.herokuapp.com/projects/${projectID}/tags`, { method: 'GET' });
    if (response.ok) {
      const tags = await response.json();
      setInitialProjectTags(tags);
      const tempoTagArray = [];
      tags.forEach((tag) => {
        tempoTagArray.push({
          value: tag.id,
          label: tag.name,
        });
      });
      setProjectTags(tempoTagArray);
    }
  }

  async function fetchProjectInfos() {
    const request = await fetch(`https://kota-api-prod.herokuapp.com/projects/${projectID}`, { method: 'GET' });
    if (request.status === 200) {
      const response = await request.json();
      setProject(response);
      setProjectTitle(response.title);
      setProjectImage(response.image);
      setProjectShortDescription(response.shortDescription);
      setProjectDescription(response.description);
    } else {
      navigate('/project/notfound', { replace: true });
    }
  }

  async function fetchCreatorInfo() {
    const request = await fetch(`https://kota-api-prod.herokuapp.com/users/${projectID}/projectCreator`, { method: 'GET' });
    if (request.ok) {
      const response = await request.json();
      if (response.id !== userID) {
        navigate('/', { replace: true });
      }
      await fetchProjectInfos();
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

  async function saveProjectTags() {
    const sentProjectTags = [];

    projectTags.forEach((projectTag) => {
      sentProjectTags.push({
        id: projectTag.value,
        name: projectTag.label,
      });
    });

    if (!isEqual(sentProjectTags, initialProjectTags)) {
      const requestOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sentProjectTags),
      };

      const request = await fetch(`https://kota-api-prod.herokuapp.com/projects/${projectID}/tags`, requestOptions);
      return request.ok;
    }
    return true;
  }

  async function saveChanges() {
    const body = JSON.stringify({
      id: projectID,
      ...(projectTitle !== project.title && { title: projectTitle }),
      ...(projectShortDescription !== project.shortDescription
          && { shortDescription: projectShortDescription }),
      ...(projectDescription !== project.description && { description: projectDescription }),
      ...(projectImage !== project.image && { image: projectImage }),
    });

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
      body,
    };
    const response = await fetch(`https://kota-api-prod.herokuapp.com/projects/${projectID}`, requestOptions);
    if (!response.ok) {
      const errorRequest = () => toast.error(response.statusText);
      errorRequest();
    }
    if (response.ok) {
      if (await saveProjectTags()) {
        changedInfos();
        setTimeout(() => {
          navigate(`/project/${projectID}`, { replace: false });
        }, 3000);
      }
    }
  }

  useEffect(() => {
    if (!isLogged) navigate('/login', { replace: true });
    fetchCreatorInfo();
    fetchTags();
    fetchProjectTags();
  }, []);

  return (
    <section className="text-black dark:text-white px-4 md:px-0">
      <div className="bg-white shadow-md border bg-gray-400 border-gray-400 rounded-lg dark:bg-gray-800 dark:border-gray-700 max-w-screen-xl px-4 py-4 md:py-16 my-16 mx-auto">
        <div className="mx-auto text-center">
          <h1 className="text-4xl md:text-6xl">
            Modify your project
          </h1>
        </div>
        <div className="my-10">
          <div className="text-right">
            <button type="button" className="w-2/3 md:w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800 disabled:hidden" onClick={loadMDFile}>
              Import a README file
            </button>
            <button type="button" className="w-2/3 mt-2 md:mt-0 w-2/3 md:w-fit ml-0 md:ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800 hidden">
              Preview result
            </button>
            <button
              type="button"
              className="w-2/3 mt-2 md:mt-0 w-2/3 md:w-fit ml-0 md:ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800 disabled:hidden"
              onClick={saveChanges}
            >
              Save changes
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
              value={projectTitle}
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
              value={projectShortDescription}
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
                && (<img src={projectImage} alt="projectImage" className="mb-4 mx-auto h-auto w-full md:w-1/2" />)
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
            value={projectTags}
            onChange={(e) => setProjectTags(e)}
            options={globalTags}
            styles={customStyles}
          />
        </div>
        <ToastContainer autoClose={2000} />
      </div>
    </section>
  );
}

export default ModifyProject;
