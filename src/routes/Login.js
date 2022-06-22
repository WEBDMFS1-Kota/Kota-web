import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/userSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, isRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function loginUser() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        email,
        password,
        rememberMe,
      }),
    };

    const response = await fetch('https://kota-api-prod.herokuapp.com/signin', requestOptions);
    if (response.ok) {
      const { token } = await response.json();
      dispatch(login(token));
      navigate('/', { replace: true });
    }
  }

  return (
    <section className="text-white min-h-screen flex items-center justify-center px-4 md:px-0">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm w-full p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our
            platform
          </h3>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Your email
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
              Your
              password
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
          <div className="grid grid-cols-2">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  onChange={() => isRememberMe(!rememberMe)}
                  required=""
                />
              </div>
              <div className="text-sm ml-3">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label
                  htmlFor="remember"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember
                  me
                </label>
              </div>
            </div>
            <Link to="/forgotPassword" className="text-sm text-blue-700 hover:underline ml-auto dark:text-blue-500">
              Lost
              Password?
            </Link>
          </div>
          <button
            type="button"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={loginUser}
          >
            Login
            to your account
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?
            {' '}
            <Link to="/register" className="text-blue-700 hover:underline dark:text-blue-500">Create an account</Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
