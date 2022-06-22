import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotjar } from '@fortawesome/free-brands-svg-icons';
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import SkeletonProjectCard from '../components/home/SkeletonProjectCard';
import ProjectCard from '../components/home/ProjectCard';

const requestOptions = {
  method: 'GET',
};

function Home() {
  const [loadingData, setLoadingData] = useState(true);
  const [listMode, setListMode] = useState('hot');
  const [projects, setProjects] = useState([]);

  async function fetchData() {
    const request = await fetch(`https://kota-api-prod.herokuapp.com/projects/${listMode}`, requestOptions);
    const response = await request.json();
    setProjects(response);
  }

  useEffect(() => {
    setLoadingData(true);
    fetchData().then(() => setLoadingData(false));
  }, [listMode]);

  useEffect(() => {
    fetchData().then(() => setLoadingData(false));
  }, []);

  return (
    <>
      <div className="mt-10 text-right mx-5">
        <NavLink to="/project/add" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800 disabled:hidden">Create a project</NavLink>
      </div>
      <div className="flex justify-center">
        <div className="bg-gray-700 mt-6 rounded shadow-xl py-3 flex justify-center w-96">
          <div className="flex">
            <button type="button" className={`${listMode === 'hot' ? 'bg-gray-400 ' : ''}rounded-xl hover:bg-gray-600 py-1.5 px-2.5 mr-4`} onClick={() => setListMode('hot')}>
              <div className="flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  <FontAwesomeIcon className="mr-3" icon={faHotjar} />
                  Hot
                </span>
              </div>
            </button>
            <button type="button" className={`${listMode === 'top' ? 'bg-gray-400 ' : ''}rounded-xl hover:bg-gray-600 py-1.5 px-2.5 ml-4`} onClick={() => setListMode('top')}>
              <div className="flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  <FontAwesomeIcon className="mr-3" icon={faRankingStar} />
                  Top
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div>
        {loadingData
            && [...Array(5)].map((value, index) => <SkeletonProjectCard key={`skeletonProject${index * 2}`} />)}
        {!loadingData
            && projects.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </>
  );
}

export default Home;
