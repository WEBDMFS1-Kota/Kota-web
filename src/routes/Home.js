import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotjar } from '@fortawesome/free-brands-svg-icons';
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';
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
      <div className="flex justify-center">
        <div className="bg-gray-700 mt-6 rounded shadow-xl py-3 flex justify-center w-96">
          <div className="flex">
            <button type="button" className="rounded-xl hover:bg-gray-600 py-1.5 px-2.5 mr-4" onClick={() => setListMode('hot')}>
              <div className="flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  <FontAwesomeIcon className="mr-3" icon={faHotjar} />
                  Hot
                </span>
              </div>
            </button>
            <button type="button" className="rounded-xl hover:bg-gray-600 py-1.5 px-2.5 ml-4" onClick={() => setListMode('top')}>
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
            && [...Array(5)].map(() => <SkeletonProjectCard />)}
        {!loadingData
            && projects.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </>
  );
}

export default Home;
