import React from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCakeCandles, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UserTags from './UserTags';
import UserTagsSkeleton from './UserTagsSkeleton';

function UserInfos(props) {
  const {
    user, projectsNumber, userTagsLoading, userTags,
  } = props;
  const personalUserID = useSelector((state) => state.user.userID);

  return (
    <div className="px-4 text-black dark:text-white">
      <div className="flex flex-col md:flex-row rounded-lg dark:border dark:border-gray-600/80 bg-gray-400 dark:bg-gray-700 mt-6 p-6 shadow-xl">
        <img
          className="w-40 h-40 rounded-full object-cover mx-auto md:mx-0"
          src={user.avatar ? user.avatar : `${process.env.PUBLIC_URL}/default-avatar.jpg`}
          alt="User"
        />
        <div className="flex flex-col px-0 md:px-6">
          <div className="flex h-8 flex-row">
            <h2 className="text-3xl font-semibold mx-auto md:mx-0">{user.pseudo}</h2>
          </div>
          <div className="my-2 flex flex-col">
            <div className="flex my-1 flex-row">
              <FontAwesomeIcon className="mr-2 h-4 w-4 dark:text-gray-400/80 text-gray-600 hover:text-gray-700 hover:dark:text-gray-400" icon={faUser} />
              <div className="text-xs dark:text-gray-400/80 text-gray-600 hover:text-gray-700 hover:dark:text-gray-400">
                {user.firstname}
                {' '}
                {user.lastname}
              </div>
            </div>
            {
              user.birthDate
                && (
                <div className="flex flex-row">
                  <FontAwesomeIcon className="mr-2 h-4 w-4 dark:text-gray-400/80 text-gray-600 hover:text-gray-700 hover:dark:text-gray-400" icon={faCakeCandles} />
                  <div className="text-xs text-gray-400/80 dark:text-gray-400/80 text-gray-600 hover:text-gray-700 hover:dark:text-gray-400">{dayjs(user.birthDate).format('DD / MM / YYYY')}</div>
                </div>
                )
            }
            <div className="flex flex-row">
              <svg
                className="mr-2 h-4 w-4 dark:fill-gray-400/80 fill-gray-600 hover:fill-gray-700 hover:dark:fill-gray-400"
                version="1.1"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12,15C12.81,15 13.5,14.7 14.11,14.11C14.7,13.5 15,12.81 15,12C15,11.19 14.7,10.5 14.11,9.89C13.5,9.3 12.81,9 12,9C11.19,9 10.5,9.3 9.89,9.89C9.3,10.5 9,11.19 9,12C9,12.81 9.3,13.5 9.89,14.11C10.5,14.7 11.19,15 12,15M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12V13.45C22,14.45 21.65,15.3 21,16C20.3,16.67 19.5,17 18.5,17C17.3,17 16.31,16.5 15.56,15.5C14.56,16.5 13.38,17 12,17C10.63,17 9.45,16.5 8.46,15.54C7.5,14.55 7,13.38 7,12C7,10.63 7.5,9.45 8.46,8.46C9.45,7.5 10.63,7 12,7C13.38,7 14.55,7.5 15.54,8.46C16.5,9.45 17,10.63 17,12V13.45C17,13.86 17.16,14.22 17.46,14.53C17.76,14.84 18.11,15 18.5,15C18.92,15 19.27,14.84 19.57,14.53C19.87,14.22 20,13.86 20,13.45V12C20,9.81 19.23,7.93 17.65,6.35C16.07,4.77 14.19,4 12,4C9.81,4 7.93,4.77 6.35,6.35C4.77,7.93 4,9.81 4,12C4,14.19 4.77,16.07 6.35,17.65C7.93,19.23 9.81,20 12,20H17V22H12C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2Z"
                />
              </svg>

              <div className="text-xs dark:text-gray-400/80 text-gray-600 hover:text-gray-700 hover:dark:text-gray-400">{user.email}</div>
            </div>
            {
                  user.githubProfileURL
                  && (
                  <div className="flex flex-row">
                    <FontAwesomeIcon className="mr-2 h-4 w-4 dark:text-gray-400/80 text-gray-600 hover:text-gray-700 hover:dark:text-gray-400" icon={faGithub} />
                    <a href={user.githubProfileURL} target="_blank" rel="noreferrer" className="text-xs dark:text-gray-400/80 text-gray-600 hover:text-gray-700 hover:dark:text-gray-400">Github profile</a>
                  </div>
                  )
              }
          </div>
          <div className="py-2 ml-2">
            <p>{user.description}</p>
          </div>
          <div className="w-full">
            <div className="">
              {
                !userTagsLoading
                  ? (
                    <UserTags userTags={userTags} />
                  )
                  : (
                    <UserTagsSkeleton />
                  )
              }
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="mt-2 flex flex-row items-center space-x-5">
              <a
                href="#projects"
                className="flex h-20 w-40 mx-auto md:mx-0 flex-col items-center justify-center rounded-md border border-black dark:border-gray-200 transition-colors duration-100 ease-in-out hover:border-black/80 hover:dark:border-gray-400/80"
              >
                <div className="flex flex-row items-center justify-center">
                  <svg
                    className="mr-3 fill-black/95 dark:fill-gray-400/95"
                    version="1.1"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M2.5 19.6L3.8 20.2V11.2L1.4 17C1 18.1 1.5 19.2 2.5 19.6M15.2 4.8L20.2 16.8L12.9 19.8L7.9 7.9V7.8L15.2 4.8M15.3 2.8C15 2.8 14.8 2.8 14.5 2.9L7.1 6C6.4 6.3 5.9 7 5.9 7.8C5.9 8 5.9 8.3 6 8.6L11 20.5C11.3 21.3 12 21.7 12.8 21.7C13.1 21.7 13.3 21.7 13.6 21.6L21 18.5C22 18.1 22.5 16.9 22.1 15.9L17.1 4C16.8 3.2 16 2.8 15.3 2.8M10.5 9.9C9.9 9.9 9.5 9.5 9.5 8.9S9.9 7.9 10.5 7.9C11.1 7.9 11.5 8.4 11.5 8.9S11.1 9.9 10.5 9.9M5.9 19.8C5.9 20.9 6.8 21.8 7.9 21.8H9.3L5.9 13.5V19.8Z"
                    />
                  </svg>
                  <span className="font-bold text-black dark:text-gray-400">{projectsNumber}</span>
                </div>
                <div className="mt-2 text-sm text-black dark:text-gray-400">Projects</div>
              </a>
            </div>
            {
              personalUserID === user.id
                && (
                <div className="mx-auto md:mx-0 mb-5 md:mb-0 ml-0 md:ml-2">
                  <NavLink to="/project/add">
                    <img src={`${process.env.PUBLIC_URL}/bouton_create_project.jpg`} alt="creatProjectButton" />
                  </NavLink>
                </div>
                )
            }
          </div>
        </div>
        {
              personalUserID === user.id
              && (
              <div className="w-100 flex flex-grow flex-col items-end justify-start">
                <div className="flex flex-row space-x-3">
                  <NavLink
                    to="/userSettings"
                    className="flex text-white rounded-md py-2 px-4 transition-all duration-150 ease-in-out bg-blue-500 hover:bg-blue-600 hover:text-white"
                  >
                    Edit profile
                  </NavLink>
                </div>
              </div>
              )
          }
      </div>
    </div>
  );
}

export default UserInfos;
