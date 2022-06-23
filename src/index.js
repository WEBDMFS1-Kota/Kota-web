import ReactDOM from 'react-dom/client';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import Navbar from './components/Navbar';
import AddProject from './routes/AddProject';
import NotFoundError from './routes/errors/404';
import ForgotPassword from './routes/ForgotPassword';
import Login from './routes/Login';
import ModifyProject from './routes/ModifyProject';
import User from './routes/User';
import Project from './routes/Project';
import Home from './routes/Home';
import Register from './routes/Register';
import ResetPassword from './routes/ResetPassword';
import UserSettings from './routes/UserSettings';
import store, { persistor } from './store/index';
import './styles/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root'),
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} className="h-full" />
          <Route path="login" element={<Login />} className="h-full" />
          <Route path="register" element={<Register />} className="h-full" />
          <Route path="forgotPassword" element={<ForgotPassword />} className="h-full" />
          <Route path="resetPassword" element={<ResetPassword />} className="h-full" />
          <Route path="userSettings" element={<UserSettings />} className="h-full" />
          <Route path="user">
            <Route index element={<Navigate to="/" replace />} />
            <Route path="notfound" element={<NotFoundError />} className="h-full" />
            <Route path=":userID" element={<User />} className="h-full" />
          </Route>
          <Route path="project">
            <Route path="add" element={<AddProject />} className="h-full" />
            <Route path="notfound" element={<NotFoundError />} className="h-full" />
            <Route path=":projectID" element={<Project />} className="h-full" />
            <Route path=":projectID/modify" element={<ModifyProject />} className="h-full" />
          </Route>
          <Route path="*" element={<NotFoundError />} className="h-full" />
        </Routes>
        <ToastContainer autoClose={1000} limit={5} />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
