import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Select from 'react-select';
import uploadImage from '../services/S3Service';
import { updateUserInfos } from '../store/userSlice';
import customStyles from '../styles/reactSelect';
import isEqual from '../utils';

function UserSettings() {
  const isLogged = useSelector((state) => state.user.isLogged);
  const userID = useSelector((state) => state.user.userID);
  const token = useSelector((state) => state.user.token);
  const [userInfos, setUserInfos] = useState({});
  const [avatar, setAvatar] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [description, setDescription] = useState('');
  const [birthDate, setBirthdate] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [githubprofileurl, setGithubProfileUrl] = useState('');
  const [userInfosLoading, setUserInfosLoading] = useState(true);
  const [globalTags, setGlobalTags] = useState([]);
  const [initialUserTags, setInitialUserTags] = useState([]);
  const [userTags, setUserTags] = useState([]);

  const storedPseudo = useSelector((state) => state.user.pseudo);
  const storedAvatar = useSelector((state) => state.user.avatar);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function fetchTags() {
    const response = await fetch('https://kota-api-prod.herokuapp.com/tags', { method: 'GET' });
    if (response.ok) {
      const tags = await response.json();
      const tempoTagArray = [];
      tags.forEach((tag) => {
        tempoTagArray.push({
          value: tag.id,
          label: tag.name,
        });
      });
      setGlobalTags(tempoTagArray);
    }
  }

  async function fetchUserTags() {
    const response = await fetch(`https://kota-api-prod.herokuapp.com/users/tags?userId=${userID}`, { method: 'GET' });
    if (response.ok) {
      const tags = await response.json();
      setInitialUserTags(tags);
      const tempoTagArray = [];
      tags.forEach((tag) => {
        tempoTagArray.push({
          value: tag.id,
          label: tag.name,
        });
      });
      setUserTags(tempoTagArray);
    }
  }

  async function saveUserTags() {
    const sentUserTags = [];

    userTags.forEach((projectTag) => {
      sentUserTags.push({
        id: projectTag.value,
        name: projectTag.label,
      });
    });

    if (!isEqual(sentUserTags, initialUserTags)) {
      const requestOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sentUserTags),
      };

      const request = await fetch(`https://kota-api-prod.herokuapp.com/users/${userID}/tags`, requestOptions);
      return request.ok;
    }
    return true;
  }

  async function saveUserChanges() {
    if (confirmPassword !== password) {
      return;
    }

    const body = JSON.stringify({
      ...(firstname !== userInfos.firstname && { firstname }),
      ...(lastname !== userInfos.lastname && { lastname }),
      ...(description !== userInfos.description && { description }),
      ...(birthDate !== userInfos.birthDate && { birthDate }),
      ...(pseudo !== userInfos.pseudo && { pseudo }),
      ...(email !== userInfos.email && { email }),
      ...(avatar !== userInfos.avatar && { avatar }),
      ...(password && { password }),
      ...(githubprofileurl !== userInfos.githubprofileurl && { githubprofileurl }),
    });

    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
      body,
    };

    const request = await fetch(`https://kota-api-prod.herokuapp.com/users?id=${userID}`, requestOptions);
    if (request.ok) {
      if (pseudo !== storedPseudo || avatar !== storedAvatar) {
        dispatch(updateUserInfos({
          ...(pseudo !== storedPseudo && { pseudo }),
          ...(avatar !== storedAvatar && { avatar }),
        }));
      }
      saveUserTags();
    }
  }

  async function fetchUserInfos() {
    const request = await fetch(`https://kota-api-prod.herokuapp.com/users?userId=${userID}`, { method: 'GET' });
    if (request.ok) {
      const response = await request.json();
      setUserInfos(response[0]);
      setAvatar(response[0].avatar);
      setFirstname(response[0].firstname);
      setLastname(response[0].lastname);
      setDescription(response[0].description);
      setBirthdate(dayjs(response[0].birthDate).format('YYYY-MM-DD'));
      setEmail(response[0].email);
      setPseudo(response[0].pseudo);
      setGithubProfileUrl(response[0].githubprofileurl);
    } else {
      navigate('/user/notfound', { replace: true });
    }
  }

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

  useEffect(() => {
    if (!isLogged) navigate('/login', { replace: true });
    fetchUserInfos().then(() => setUserInfosLoading(false));
    fetchTags();
    fetchUserTags();
  }, []);

  if (userInfosLoading) {
    return (
      <p>Loading</p>
    );
  }

  return (
    <div className="container mx-auto">
      <section>
        <div className="bg-white shadow-md border border-gray-200 rounded-lg w-full p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#">
            <div className="grid grid-cols-2">
              <div>
                <div className="grid gap-4 grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstname"
                      className="text-xl font-medium text-gray-900 block mb-2 dark:text-gray-300"
                    >
                      Firstname
                      <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={firstname}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Firstname"
                        required=""
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor="lastname"
                      className="text-xl font-medium text-gray-900 block mb-2 dark:text-gray-300"
                    >
                      Lastname
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={lastname}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Lastname"
                        required=""
                        onChange={(e) => setLastname(e.target.value)}
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="birthdate"
                    className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                  >
                    Birth date
                    <input
                      type="date"
                      name="birthdate"
                      id="birthdate"
                      value={birthDate}
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
                    className="text-xl font-medium text-gray-900 block mb-2 dark:text-gray-300"
                  >
                    Pseudonyme
                    <input
                      type="text"
                      name="pseudonyme"
                      id="pseudonyme"
                      value={pseudo}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Pseudo"
                      required=""
                      onChange={(e) => setPseudo(e.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-xl font-medium text-gray-900 block mb-2 dark:text-gray-300"
                  >
                    Email
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@company.com"
                      required=""
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-xl font-medium text-gray-900 block mb-2 dark:text-gray-300"
                  >
                    New Password
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required=""
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="text-xl font-medium text-gray-900 block mb-2 dark:text-gray-300"
                  >
                    Confirm password
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required=""
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="githubprofileurl"
                    className="text-xl font-medium text-gray-900 block mb-2 dark:text-gray-300"
                  >
                    Github profile URL
                    <input
                      type="text"
                      name="githubprofileurl"
                      id="githubprofileurl"
                      value={githubprofileurl}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="https://github.com/..."
                      onChange={(e) => setGithubProfileUrl(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="h-full flex flex-col">
                <div className="text-center">
                  {
                    !avatar
                      && (
                    // eslint-disable-next-line max-len
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                      <div className="rounded-full h-36 w-36 bg-gray-600 hover:bg-gray-700 mx-auto flex items-center justify-center my-auto" onClick={selectImage}>
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
                            <img className="rounded-full h-36 w-36 mx-auto my-auto" src={avatar} alt="userAvtar" />
                          </div>
                        </div>
                      </div>
                      )
                  }
                  <label
                    htmlFor="avatar"
                    className="text-xl font-medium text-center text-gray-900 block mt-2 dark:text-gray-300"
                  >
                    Avatar
                    <input type="hidden" name="avatar" id="avatar" value={avatar} />
                  </label>
                </div>
                <div className="ml-5">
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label
                    htmlFor="description"
                    className="text-xl font-medium text-gray-900 block mt-2 dark:text-gray-300"
                  >
                    Description
                  </label>
                  <textarea
                    rows="11"
                    className="resize-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-32 col-span-2">
                <h1 className="text-lg font-medium text-gray-900 block dark:text-gray-300 mb-5">
                  Tags of the project
                </h1>
                <Select
                  isMulti
                  closeMenuOnSelect={false}
                  value={userTags}
                  onChange={(e) => setUserTags(e)}
                  options={globalTags}
                  styles={customStyles}
                />
              </div>
              <div className="col-span-2 text-center">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:hidden"
                  onClick={saveUserChanges}
                >
                  Save your changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
      <section>
        <p />
      </section>
    </div>
  );
}

export default UserSettings;
