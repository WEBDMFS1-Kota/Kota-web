import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import Select from 'react-select';
import uploadImage from '../services/S3Service';

const customStyles = {
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'transparent',
    color: 'white',
    borderColor: 'white',
  }),

  container: (provided) => ({
    ...provided,
    color: 'transparent',
  }),

  control: (provided) => ({
    ...provided,
    backgroundColor: 'transparent',
  }),

  placeholder: (provided) => ({
    ...provided,
    color: 'white',
  }),

  option: (provided, { isFocused }) => ({
    ...provided,
    color: isFocused ? 'black' : 'white',
  }),
};

function AddProject() {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
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
    fetchTags();
  }, []);

  return (
    <section className="text-white bg-gray-900">
      <div className="max-w-screen-xl px-4 py-32 mx-auto lg:h-screen">
        <div className="mx-auto text-center">
          <h1 className="text-6xl">
            Create a project
          </h1>
        </div>
        <div className="my-10">
          <div className="text-right">
            <button type="button" className="mx-2 p-2 border-2 border-white rounded-lg" onClick={loadMDFile}>
              Import a README file
            </button>
            <button type="button" className="mx-2 p-2 border-2 border-white rounded-lg">
              Preview result
            </button>
            <button
              type="button"
              className="mx-2 p-2 border-2 border-white rounded-lg"
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
              className="bg-transparent border border-black text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-white dark:placeholder-gray-200 dark:text-white mt-3"
              placeholder="Name of the project"
              onChange={(e) => setProjectTitle(e.target.value)}
              required=""
            />
          </label>
        </div>
        <div className="mt-4 w-full">
          <h1
            className="text-lg font-medium text-gray-900 block dark:text-gray-300 mb-5"
          >
            Image of the project (optional)
          </h1>
          <div className="w-full text-center">
            <img src={projectImage} alt="projectImage" className="mb-4 mx-auto" />
            <button type="button" className="mx-auto p-2 border-2 border-white rounded-lg" onClick={selectImage}>Upload image</button>
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
