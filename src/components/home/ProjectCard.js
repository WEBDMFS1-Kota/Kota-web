import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function projectCard(props) {
  const { project } = props;

  async function upVote() {
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        voterId: 1,
        value: 1,
      }),
    };
    await fetch(`https://kota-api-prod.herokuapp.com/projects/vote/${project.id}`, options);
  }

  async function downVote() {
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        voterId: 1,
        value: -1,
      }),
    };
    await fetch(`https://kota-api-prod.herokuapp.com/projects/vote/${project.id}`, options);
  }

  return (
    <div className="grid grid-cols-1 my-2 mx-12 justify-items-center">
      <div className="bg-gray-700 text-white w-96 rounded-lg overflow-hidden shadow-xl my-2">
        <a href={`/project/${project.id}`}>
          {project.image && <img className="w-full" src={project.image} alt={`project-${project.id}`} />}
        </a>
        <div className="px-6 py-4">
          <a href={`/project/${project.id}`}>
            <div className="font-bold text-xl mb-2 hover:underline">{project.title}</div>
          </a>
          <p className="text-grey-darker text-base hidden">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
          </p>
        </div>
        <div className="flex px-6 py-4">
          <button type="button" className=" rounded-xl hover:bg-gray-600 py-1.5 px-2.5">
            <span className="inline-block bg-grey-lighter rounded-full px-1 py-1 text-sm font-semibold text-grey-darker mr-2"><FontAwesomeIcon icon={faArrowUp} /></span>
            <span className="inline-block bg-grey-lighter rounded-full text-sm font-semibold text-grey-darker">{project.upVote}</span>
          </button>
          <button type="button" className="rounded-xl hover:bg-gray-600 py-1.5 px-2.5">
            <span className="inline-block bg-grey-lighter rounded-full px-1 py-1 text-sm font-semibold text-grey-darker mr-2"><FontAwesomeIcon icon={faArrowDown} /></span>
            <span className="inline-block bg-grey-lighter rounded-full text-sm font-semibold text-grey-darker">{project.downVote}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default projectCard;
