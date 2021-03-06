import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { login } from '../store/userSlice';

function resetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const isLogged = useSelector((state) => state.user.isLogged);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function resetPasswordAndSign() {
    if (password !== confirmPassword) return;
    if (!token) return;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        token,
        password,
      }),
    };

    const request = await fetch('https://kota-api-prod.herokuapp.com/resetPassword', requestOptions);
    if (request.ok) {
      const response = await request.text();
      dispatch(login(response));
      navigate('/', { replace: true });
    }
  }

  useEffect(() => {
    if (isLogged) navigate('/userSettings', { replace: true });
  }, []);

  return (
    <section className="text-black dark:text-white flex flex-grow items-center justify-center px-4 md:px-0">
      <div className="bg-white shadow-md border bg-gray-400 border-gray-400 rounded-lg max-w-sm w-full p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#">
          <h3 className="text-xl font-medium">
            Reset your password
          </h3>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium block mb-2 dark:text-gray-300"
            >
              Your
              password
              {' '}
              <span className="text-red-500">*</span>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="????????????????????????"
                className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400"
                onChange={(e) => setPassword(e.target.value)}
                required=""
              />
            </label>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium block mb-2"
            >
              Confirm your password
              {' '}
              <span className="text-red-500">*</span>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="????????????????????????"
                className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required=""
              />
            </label>
          </div>
          <button
            type="button"
            onClick={resetPasswordAndSign}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Reset my password
          </button>
        </form>
      </div>
    </section>
  );
}

export default resetPassword;
