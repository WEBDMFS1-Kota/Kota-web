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
    <section className="text-black dark:text-white">
      <div className="w-full mt-4 grid grid-cols-12">
        <div className="px-4 md:px-0 col-start-0 md:col-start-3 col-span-12 md:col-span-8 order-2 md:order-1">
          <div className="flex justify-center">
            <div className="bg-gray-400 dark:bg-gray-700 rounded shadow-xl py-3 flex justify-center w-96">
              <div className="flex">
                <button type="button" className={`${listMode === 'hot' ? 'bg-blue-700 dark:bg-gray-400 text-white ' : ''}rounded-xl hover:text-white hover:bg-blue-600 hover:dark:bg-gray-600 py-1.5 px-2.5 mr-4`} onClick={() => setListMode('hot')}>
                  <div className="flex items-center justify-center">
                    <span className="text-sm font-medium">
                      <FontAwesomeIcon className="mr-3" icon={faHotjar} />
                      Hot
                    </span>
                  </div>
                </button>
                <button type="button" className={`${listMode === 'top' ? 'bg-blue-700 dark:bg-gray-400 text-white ' : ''}rounded-xl hover:text-white hover:bg-blue-600 hover:dark:bg-gray-600 py-1.5 px-2.5 ml-4`} onClick={() => setListMode('top')}>
                  <div className="flex items-center justify-center">
                    <span className="text-sm font-medium">
                      <FontAwesomeIcon className="mr-3" icon={faRankingStar} />
                      Top
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2 col-span-12 md:col-span-2 text-center md:text-right mb-2">
          <NavLink to="/project/add"><button className="text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800 disabled:hidden my-auto mr-4" type="button">Create a project</button></NavLink>
        </div>
      </div>
      <div className="px-4 md:px-0">
        <div>
          {loadingData
              && [...Array(5)].map((value, index) => <SkeletonProjectCard key={`skeletonProject${index * 2}`} />)}
          {!loadingData
              && projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
    </section>
  );
}

export default Home;
