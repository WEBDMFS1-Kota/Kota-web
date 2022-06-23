import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  async function getResetEmail() {
    if (!validateEmail(email)) return;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        email,
      }),
    };

    const request = await fetch('https://kota-api-prod.herokuapp.com/forgotPassword', requestOptions);
    if (request.ok) {
      navigate('/login');
    }
  }

  return (
    <section className="text-white min-h-screen bg-gray-900 flex items-center justify-center px-4 md:px-0">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm w-full p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Forgot your password ?
          </h3>
          <p>We will send you a reset password link by email</p>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Your
              email
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
          <button
            type="button"
            onClick={getResetEmail}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Reset my password
          </button>
        </form>
      </div>
    </section>
  );
}

export default ForgotPassword;
