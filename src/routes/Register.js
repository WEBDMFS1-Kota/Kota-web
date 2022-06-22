import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import uploadImage from '../services/S3Service';
import { login } from '../store/userSlice';

function Register() {
  const [avatar, setAvatar] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthDate, setBirthdate] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [githubprofileurl, setGithubProfileUrl] = useState('');
  const [rememberMe, isRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function selectImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.jpg,.jpeg,.png,.svg,.webp,.gif,.avif';
    input.onchange = (e) => {
      const file = e.target.files[0];

      uploadImage('avatar', file).then((imageURL) => {
        if (imageURL) {
          setAvatar(imageURL);
        }
      });
    };
    input.click();
  }

  async function createAccount() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        avatar,
        pseudo,
        birthDate,
        firstname,
        lastname,
        email,
        password,
        githubprofileurl,
        rememberMe,
      }),
    };
    const response = await fetch('https://kota-api-prod.herokuapp.com/signup', requestOptions);
    if (response.ok) {
      const { token } = await response.json();
      dispatch(login(token));
      navigate('/', { replace: true });
    }
  }
  return (
    <section className="text-white min-h-screen bg-gray-900 flex items-center justify-center px-4 md:px-0 mb-4">
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
            {
                !avatar
                && (
                // eslint-disable-next-line max-len
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                <div
                  className="rounded-full h-36 w-36 bg-gray-600 hover:bg-gray-700 mx-auto flex items-center justify-center my-auto"
                  onClick={selectImage}
                >
                  <FontAwesomeIcon className="" icon={faCamera} size="2xl" />
                </div>
                )
            }
            {
                avatar
                && (
                <div className="relative">
                  <div className="absolute inset-0 z-10 rounded-full h-36 w-36 bg-gray-700 text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-opacity-90 duration-300">
                    <FontAwesomeIcon className="" icon={faCamera} size="2xl" />
                  </div>
                  <div className="relative">
                    <div className="h-48 flex flex-wrap content-center">
                      <img className="rounded-full h-36 w-36 mx-auto my-auto" src={avatar} alt="userAvatar" />
                    </div>
                  </div>
                </div>
                )
            }
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
              htmlFor="firstname"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Birth date
              <input
                type="date"
                name="birthdate"
                id="birthdate"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="2022-12-18"
                onChange={(e) => setBirthdate(e.target.value)}
                required=""
              />
            </label>
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
                htmlFor="cgu"
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
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                onChange={() => isRememberMe(!rememberMe)}
              />
            </div>
            <div className="text-sm ml-3">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label
                htmlFor="remember"
                className="font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
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
