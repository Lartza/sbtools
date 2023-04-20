import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import store from './store';
import App from './App';
import SponsortimeTable from './components/SponsortimeTable';
import VideoTable from './components/VideoTable';
import UUIDTable from './components/UUIDTable';
import UsernameTable from './components/UsernameTable';
import UserIDTable from './components/UserIDTable';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <SponsortimeTable />,
      },
      {
        path: '/video/:videoID',
        element: <VideoTable />,
      },
      {
        path: '/uuid/:UUID',
        element: <UUIDTable />,
      },
      {
        path: '/username/:userName',
        element: <UsernameTable />,
      },
      {
        path: '/userid/:userID',
        element: <UserIDTable />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
