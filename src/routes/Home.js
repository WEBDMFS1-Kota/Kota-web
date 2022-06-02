/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import NavbarBeforeLogin from '../components/NavbarBeforeLogin';
import NavbarAfterLogin from '../components/NavbarAfterLogin';

function Home() {
  function StatusLogin(isLogged) {
    if (!isLogged) {
      return <NavbarAfterLogin />;
    }
    return <NavbarBeforeLogin />;
  }
  return (
    <StatusLogin islogged={false} />
  );
}

export default Home;
