import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function projectCard(props) {
  const { project } = props;
  const isLogged = useSelector((state) => state.user.isLogged);
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.userID);
  const notConnected = () => toast.error('You must be connected to vote for a project.');
  const voteOk = () => toast.success('Vote registered');
  const [projectUpVote, setProjectUpVote] = useState(0);
  const [projectDownVote, setProjectDownVote] = useState(0);
  const [voteStatus, setVoteStatus] = useState(0);
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
      const request = await fetch(`https://kota-api-prod.herokuapp.com/projects/vote/${project.id}`, options);
      console.log(request);
      if (voteStatus === 1) {
        setVoteStatus(0);
        setProjectUpVote(projectUpVote - 1);
      } else if (voteStatus === -1) {
        setVoteStatus(1);
        setProjectUpVote(projectUpVote + 1);
        setProjectDownVote(projectDownVote - 1);
      } else {
        setVoteStatus(1);
        setProjectUpVote(projectUpVote + 1);
      }
      voteOk();
    } else {
      notConnected();
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
      const patched = await fetch(`https://kota-api-prod.herokuapp.com/projects/vote/${project.id}`, options);
      if (!patched.ok) {
        const errorRequest = () => toast.error(patched.statusText);
        errorRequest();
      } else {
        voteOk();
      }
      if (voteStatus === -1) {
        setVoteStatus(0);
        setProjectDownVote(projectDownVote - 1);
      } else if (voteStatus === 1) {
        setVoteStatus(-1);
        setProjectUpVote(projectUpVote - 1);
        setProjectDownVote(projectDownVote + 1);
      } else {
        setVoteStatus(-1);
        setProjectDownVote(projectDownVote + 1);
      }
    } else {
      notConnected();
    }
  }

  async function fetchUserVotes() {
    const request = await fetch(`https://kota-api-prod.herokuapp.com/projects/vote/${project.id}?id=${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    console.log(request);
    if (request.ok && request.status === 200) {
      const vote = await request.json();
      setVoteStatus(vote.voteValue);
    }
  }

  useEffect(() => {
    fetchUserVotes();
    setProjectDownVote(project.downVote);
    setProjectUpVote(project.upVote);
  }, []);

  return (
    <div className="grid grid-cols-1 my-2 mx-0 md:mx-12 justify-items-center">
      <div className="bg-gray-400 dark:bg-gray-700 text-black dark:text-white w-full md:w-96 rounded-lg overflow-hidden shadow-xl my-2">
        <NavLink to={`/project/${project.id}`}>
          {project.image && <img className="w-full max-h-48 object-cover" src={project.image} alt={`project-${project.id}`} />}
        </NavLink>
        <div className="px-6 py-4">
          <NavLink to={`/project/${project.id}`}>
            <div className="font-bold text-xl mb-2 hover:underline">{project.title}</div>
          </NavLink>
          <p className="text-grey-darker text-base">
            {project.shortDescription}
          </p>
        </div>
        <div className="flex px-6 py-4">
          <button type="button" className={`${voteStatus === 1 ? 'bg-blue-500 text-white ' : ''}rounded-xl hover:text-white hover:bg-blue-600 py-1.5 px-2.5 mr-1`} onClick={() => upVote()}>
            <span className="inline-block bg-grey-lighter rounded-full px-1 py-1 text-sm font-semibold text-grey-darker mr-2"><FontAwesomeIcon icon={faArrowUp} /></span>
            <span className="inline-block bg-grey-lighter rounded-full text-sm font-semibold text-grey-darker">{projectUpVote}</span>
          </button>
          <button type="button" className={`${voteStatus === -1 ? 'bg-red-500 ' : ''}rounded-xl hover:text-white hover:bg-red-600 py-1.5 px-2.5`} onClick={() => downVote()}>
            <span className="inline-block bg-grey-lighter rounded-full px-1 py-1 text-sm font-semibold text-grey-darker mr-2"><FontAwesomeIcon icon={faArrowDown} /></span>
            <span className="inline-block bg-grey-lighter rounded-full text-sm font-semibold text-grey-darker">{projectDownVote}</span>
          </button>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default projectCard;
