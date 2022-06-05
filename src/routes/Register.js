/* eslint-disable */

import React, { useState } from 'react';

function Login() {


  return (
      <section className="text-white min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm w-full p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign up with credentials
            </h3>
            <div className="grid grid-cols-2">
              <div>
                <label
                    htmlFor="firstname"
                    className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                >
                  Firstname
                  <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Firstname"
                      required=""
                  />
                </label>
              </div>
              <div>
                <label
                    htmlFor="lastname"
                    className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                >
                  Lastname
                  <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Lastname"
                      required=""
                  />
                </label>
              </div>
            </div>
            <div>
              <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Email
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required=""
                />
              </label>
            </div>
            <div>
              <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Password
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required=""
                />
              </label>
            </div>
            <div className="grid grid-cols-2">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      required=""
                  />
                </div>
                <div className="text-sm ml-3">
                  <label
                      htmlFor="remember"
                      className="font-medium text-gray-900 dark:text-gray-300"
                  >
                    Remember
                    me
                  </label>
                </div>
              </div>
              <a
                  href="https://google.fr"
                  className="text-sm text-blue-700 hover:underline ml-auto dark:text-blue-500"
              >
                Lost
                Password?
              </a>
            </div>
            <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
              to your account
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?
              {' '}
              <a
                  href="https://google.fr"
                  className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create
                account
              </a>
            </div>
          </form>
        </div>
      </section>
  );
}

export default Login;
