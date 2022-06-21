import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserInfos from '../components/User/UserInfos';
import UserInfosSkeleton from '../components/User/UserInfosSkeleton';
import UserProjects from '../components/User/UserProjects';
import UserProjectsSkeleton from '../components/User/UserProjectsSkeleton';

function User() {
  const { userID } = useParams();
  const [user, setUser] = useState({});
  const [userProjects, setUserProjects] = useState([]);
  const [userInfoLoading, setUserInfoLoading] = useState(true);
  const [userProjectsLoading, setUserProjectsLoading] = useState(true);

  const navigate = useNavigate();

  async function fetchUserProjects() {
    const request = await fetch(`https://kota-api-prod.herokuapp.com/users/${userID}/projects`, { method: 'GET' });
    if (request.ok) {
      const response = await request.json();
      setUserProjects(response);
    }
  }

  async function fetchUserInfos() {
    const request = await fetch(`https://kota-api-prod.herokuapp.com/users?userId=${userID}`, { method: 'GET' });
    if (request.status === 200) {
      const response = await request.json();
      setUser(response[0]);
      await fetchUserProjects();
    } else {
      navigate('/user/notfound', { replace: true });
    }
  }

  useEffect(() => {
    fetchUserInfos().then(() => {
      setUserInfoLoading(false);
      fetchUserProjects().then(() => setUserProjectsLoading(false));
    });
  }, []);

  return (
    <div className="container md:w-3/4 xl:w-2/3 mx-auto">
      {
        userInfoLoading
          && <UserInfosSkeleton />
      }
      {
        !userInfoLoading
          && <UserInfos user={user} projectsNumber={userProjects.length} />
      }
      {
        userProjectsLoading
          && <UserProjectsSkeleton />
      }
      {
        !userProjectsLoading
          && <UserProjects projects={userProjects} />
      }
    </div>
  );
}

export default User;
