import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faUser, faCakeCandles, faArrowDown, faArrowUp, faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

function Profile() {
  return (
    <>
      <div className="mx-20 my-10 grid">
        <div className="flex flex-row rounded-lg border border-gray-600/80 bg-gray-700 p-6 shadow-xl">
          <div className="relative">
            <img
              className="w-40 h-40 rounded-full object-cover"
              src="https://api.lorem.space/image/face?w=150&h=150"
              alt="User"
            />
          </div>
          <div className="flex flex-col px-6">
            <div className="flex h-8 flex-row">
              <h2 className="text-lg font-semibold text-white">Username</h2>
            </div>
            <div className="my-2 flex flex-row space-x-2">
              <div className="flex flex-row">
                <FontAwesomeIcon className="mr-2 h-4 w-4 text-gray-500/80" icon={faUser} />
                <div className="text-xs text-gray-400/80 hover:text-gray-400">First name Last name</div>
              </div>
              <div className="flex flex-row">
                <FontAwesomeIcon className="mr-2 h-4 w-4 text-gray-500/80" icon={faCakeCandles} />
                <div className="text-xs text-gray-400/80 hover:text-gray-400">11/04/2000</div>
              </div>
              <div className="flex flex-row">
                <svg
                  className="mr-2 h-4 w-4 fill-gray-400/80"
                  version="1.1"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12,15C12.81,15 13.5,14.7 14.11,14.11C14.7,13.5 15,12.81 15,12C15,11.19 14.7,10.5 14.11,9.89C13.5,9.3 12.81,9 12,9C11.19,9 10.5,9.3 9.89,9.89C9.3,10.5 9,11.19 9,12C9,12.81 9.3,13.5 9.89,14.11C10.5,14.7 11.19,15 12,15M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12V13.45C22,14.45 21.65,15.3 21,16C20.3,16.67 19.5,17 18.5,17C17.3,17 16.31,16.5 15.56,15.5C14.56,16.5 13.38,17 12,17C10.63,17 9.45,16.5 8.46,15.54C7.5,14.55 7,13.38 7,12C7,10.63 7.5,9.45 8.46,8.46C9.45,7.5 10.63,7 12,7C13.38,7 14.55,7.5 15.54,8.46C16.5,9.45 17,10.63 17,12V13.45C17,13.86 17.16,14.22 17.46,14.53C17.76,14.84 18.11,15 18.5,15C18.92,15 19.27,14.84 19.57,14.53C19.87,14.22 20,13.86 20,13.45V12C20,9.81 19.23,7.93 17.65,6.35C16.07,4.77 14.19,4 12,4C9.81,4 7.93,4.77 6.35,6.35C4.77,7.93 4,9.81 4,12C4,14.19 4.77,16.07 6.35,17.65C7.93,19.23 9.81,20 12,20H17V22H12C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2Z"
                  />
                </svg>

                <div className="text-xs text-gray-400/80 hover:text-gray-400">john.doe@doe.com</div>
              </div>
              <div className="flex flex-row">
                <FontAwesomeIcon className="mr-2 h-4 w-4 text-gray-500/80" icon={faGithub} />
                <a href="https://github.com/Damokless" className="text-xs text-gray-400/80 hover:text-gray-400">Github profile</a>
              </div>
            </div>
            <div className="mt-2 flex flex-row items-center space-x-5">
              <a
                href="#projects"
                className="flex h-20 w-40 flex-col items-center justify-center rounded-md border border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80"
              >
                <div className="flex flex-row items-center justify-center">
                  <svg
                    className="mr-3 fill-gray-400/95"
                    version="1.1"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M2.5 19.6L3.8 20.2V11.2L1.4 17C1 18.1 1.5 19.2 2.5 19.6M15.2 4.8L20.2 16.8L12.9 19.8L7.9 7.9V7.8L15.2 4.8M15.3 2.8C15 2.8 14.8 2.8 14.5 2.9L7.1 6C6.4 6.3 5.9 7 5.9 7.8C5.9 8 5.9 8.3 6 8.6L11 20.5C11.3 21.3 12 21.7 12.8 21.7C13.1 21.7 13.3 21.7 13.6 21.6L21 18.5C22 18.1 22.5 16.9 22.1 15.9L17.1 4C16.8 3.2 16 2.8 15.3 2.8M10.5 9.9C9.9 9.9 9.5 9.5 9.5 8.9S9.9 7.9 10.5 7.9C11.1 7.9 11.5 8.4 11.5 8.9S11.1 9.9 10.5 9.9M5.9 19.8C5.9 20.9 6.8 21.8 7.9 21.8H9.3L5.9 13.5V19.8Z"
                    />
                  </svg>
                  <span className="font-bold text-gray-400"> 45 </span>
                </div>
                <div className="mt-2 text-sm text-gray-400">Projects</div>
              </a>
            </div>
          </div>
          <div className="w-100 flex flex-grow flex-col items-end justify-start">
            <div className="flex flex-row space-x-3">
              <button
                type="button"
                className="flex text-gray-400 rounded-md border-2 border-blue-400/80 py-2 px-4 transition-all duration-150 ease-in-out hover:bg-blue-600 hover:text-white"
              >
                Edit profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 my-10 mx-12 justify-items-center" id="projects">
        <div className="bg-gray-700 text-white w-96 rounded-lg overflow-hidden shadow-xl my-2">
          <img className="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p className="text-grey-darker text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla
            </p>
          </div>
          <div className="flex justify-between px-6 py-4 w-full">
            <button type="button" className=" rounded-xl hover:bg-gray-600 py-1.5 px-2.5 cursor-default">
              <span className="inline-block bg-grey-lighter rounded-full px-1 py-1 text-sm font-semibold text-grey-darker mr-2"><FontAwesomeIcon icon={faArrowUp} /></span>
              <span className="inline-block bg-grey-lighter rounded-full text-sm font-semibold text-grey-darker">420</span>
            </button>
            <button type="button" className="rounded-xl hover:bg-gray-600 py-1.5 px-2.5 cursor-default">
              <span className="inline-block bg-grey-lighter rounded-full px-1 py-1 text-sm font-semibold text-grey-darker mr-2"><FontAwesomeIcon icon={faArrowDown} /></span>
              <span className="inline-block bg-grey-lighter rounded-full text-sm font-semibold text-grey-darker">3</span>
            </button>
            <button type="button" className="justify-end group hover:bg-red-500/60 rounded-xl">
              <span className="group-hover:text-white inline-block bg-grey-lighter rounded-full px-1 py-1 text-sm text-red-500 font-semibold text-grey-darker mr-2"><FontAwesomeIcon icon={faTrashCan} /></span>
              <span className="group-hover:text-white group-hover:underline inline-block bg-grey-lighter rounded-full px-1 py-1 text-sm text-red-500 font-semibold text-grey-darker mr-2">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
