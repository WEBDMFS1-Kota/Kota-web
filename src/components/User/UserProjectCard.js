import { faArrowDown, faArrowUp, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UserProjectCard(props) {
  const { project, userID } = props;
  const isLogged = useSelector((state) => state.user.isLogged);
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.userID);

  const navigate = useNavigate();

  async function deleteProject() {
    const requestOptions = {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    };

    const request = await fetch(`https://kota-api-prod.herokuapp.com/projects/${project.id}`, requestOptions);
    if (request.ok) {
      navigate(0);
    }
  }

  async function upVote() {
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        voterId: userId,
        value: 1,
      }),
    };
    if (isLogged) {
      await fetch(`https://kota-api-prod.herokuapp.com/projects/vote/${project.id}`, options);
    }
  }

  async function downVote() {
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        voterId: userId,
        value: -1,
      }),
    };
    if (isLogged) {
      await fetch(`https://kota-api-prod.herokuapp.com/projects/vote/${project.id}`, options);
    }
  }

  return (
    <div className="px-4 mt-2">
      <div className="bg-gray-700 text-white rounded-lg overflow-hidden shadow-xl my-4">
        {
          project.image
          && (<img className="w-full" src={project.image} alt="Sunset in the mountains" />)
        }
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{project.title}</div>
          <p className="text-grey-darker text-base">
            {project.shortDescription}
          </p>
        </div>
        <div className="flex justify-between px-6 py-4 w-full">
          <button type="button" className=" rounded-xl hover:bg-gray-600 py-1.5 px-2.5 cursor-default" onClick={() => upVote()}>
            <span className="inline-block bg-grey-lighter rounded-full px-1 py-1 text-sm font-semibold text-grey-darker mr-2"><FontAwesomeIcon icon={faArrowUp} /></span>
            <span className="inline-block bg-grey-lighter rounded-full text-sm font-semibold text-grey-darker">{project.upVote}</span>
          </button>
          <button type="button" className="rounded-xl hover:bg-gray-600 py-1.5 px-2.5 cursor-default" onClick={() => downVote()}>
            <span className="inline-block bg-grey-lighter rounded-full px-1 py-1 text-sm font-semibold text-grey-darker mr-2"><FontAwesomeIcon icon={faArrowDown} /></span>
            <span className="inline-block bg-grey-lighter rounded-full text-sm font-semibold text-grey-darker">{project.downVote}</span>
          </button>
          {
              (isLogged && userID === userId)
              && (
              <button type="button" className="justify-end group hover:bg-red-500/60 rounded-xl" onClick={deleteProject}>
                <span className="group-hover:text-white inline-block bg-grey-lighter rounded-full px-1 py-1 text-sm text-red-500 font-semibold text-grey-darker mr-2"><FontAwesomeIcon icon={faTrashCan} /></span>
                <span className="group-hover:text-white group-hover:underline inline-block bg-grey-lighter rounded-full px-1 py-1 text-sm text-red-500 font-semibold text-grey-darker mr-2">Delete</span>
              </button>
              )
          }
        </div>
      </div>
    </div>
  );
}

export default UserProjectCard;
