import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import Select from 'react-select';

const options = [
  { value: 'NodeJS', label: 'NodeJS' },
  { value: 'Python', label: 'Python' },
  { value: 'vanilla', label: 'Vanilla' },
];

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
            <button type="button" className="mx-2 p-2 border-2 border-white rounded-lg">
              Import a README file
            </button>
            <button type="button" className="mx-2 p-2 border-2 border-white rounded-lg">
              Preview result
            </button>
            <button type="button" className="mx-2 p-2 border-2 border-white rounded-lg">
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
              required=""
            />
          </label>
        </div>
        <div className="mt-4">
          <h1
            className="text-lg font-medium text-gray-900 block dark:text-gray-300 mb-5"
          >
            Description of the project
          </h1>
          <SimpleMDE className="bg-transparent" />
        </div>
        <div>
          <h1 className="text-lg font-medium text-gray-900 block dark:text-gray-300 mb-5">
            Tags of the project
          </h1>
          <Select
            isMulti
            options={options}
            styles={customStyles}
          />
        </div>
      </div>
    </section>
  );
}

export default AddProject;
