import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [githubprofileurl, setGithubProfileUrl] = useState('');

  async function createAccount() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        pseudo: `${pseudo}`,
        firstname: `${firstname}`,
        lastname: `${lastname}`,
        email: `${email}`,
        password: `${password}`,
        githubprofileurl: `${githubprofileurl}`,
      }),
    };
    await fetch('https://kota-api-prod.herokuapp.com/users', requestOptions);
  }
  return (
    <section className="text-white min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm w-full p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign up with credentials
          </h3>
          <div>
            <label
              htmlFor="avatar"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Avatar
              <input type="hidden" name="avatar" id="avatar" />
            </label>
            <div className="rounded-full h-24 w-24 bg-gray-500 mx-auto flex items-center justify-center">
              <FontAwesomeIcon className="" icon={faCamera} size="2xl" />
            </div>
          </div>
          <div className="grid gap-4 grid-cols-2">
            <div>
              <label
                htmlFor="firstname"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Firstname
                {' '}
                <span className="text-red-500">*</span>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Firstname"
                  onChange={(e) => setFirstname(e.target.value)}
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
                {' '}
                <span className="text-red-500">*</span>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Lastname"
                  onChange={(e) => setLastname(e.target.value)}
                  required=""
                />
              </label>
            </div>
          </div>
          <div>
            <label
              htmlFor="pseudonyme"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Pseudonyme
              {' '}
              <span className="text-red-500">*</span>
              <input
                type="text"
                name="pseudonyme"
                id="pseudonyme"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Pseudo"
                onChange={(e) => setPseudo(e.target.value)}
                required=""
              />
            </label>
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Email
              {' '}
              <span className="text-red-500">*</span>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                onChange={(e) => setEmail(e.target.value)}
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
              {' '}
              <span className="text-red-500">*</span>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                onChange={(e) => setPassword(e.target.value)}
                required=""
              />
            </label>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Confirm password
              {' '}
              <span className="text-red-500">*</span>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required=""
              />
            </label>
          </div>
          <div>
            <label
              htmlFor="githubprofileurl"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Github profile URL
              <input
                type="text"
                name="githubprofileurl"
                id="githubprofileurl"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="https://github.com/..."
                onChange={(e) => setGithubProfileUrl(e.target.value)}
              />
            </label>
          </div>
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
                You agree with our general terms you can find
                {' '}
                <a href="https://www.termsandcondiitionssample.com/live.php?token=MTnI9Z8q7MrnYYLecv1nmjSQRfwtZT94" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline dark:text-blue-500">here</a>
                {' '}
                <span className="text-red-500">*</span>
              </label>
            </div>
          </div>
          <button
            type="button"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:hidden"
            onClick={createAccount}
          >
            Create your account
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already have an account?
            {' '}
            <Link to="/login" className="text-blue-700 hover:underline dark:text-blue-500">Login</Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;
