import ReactDOM from 'react-dom/client';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/index';

const root = ReactDOM.createRoot(
  document.getElementById('root'),
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
);
