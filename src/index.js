import ReactDOM from 'react-dom/client';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import AddProject from './routes/AddProject';
import NotFoundError from './routes/errors/404';
import Login from './routes/Login';
import Profile from './routes/Profile';
import Project from './routes/Project';
import Home from './routes/Home';
import Register from './routes/Register';
import store from './store/index';
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
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        <Route path="project">
          <Route index element={<Navigate to="/" replace />} />
          <Route path="add" element={<AddProject />} />
          <Route path=":projectID" element={<Project />} />
        </Route>
        <Route path="*" element={<NotFoundError />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
);
