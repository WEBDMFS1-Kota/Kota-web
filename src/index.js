import ReactDOM from 'react-dom/client';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import NotFoundError from './routes/errors/404';
import Login from './routes/Login';
import Profile from './routes/Profile';
import Project from './routes/Project';
import store from './store/index';
import Home from './routes/Home';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root'),
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="project" element={<Project />} />
        <Route path="*" element={<NotFoundError />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
);
