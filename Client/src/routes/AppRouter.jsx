import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import Login from '../pages/authUser/Login';
import Register from '../pages/authUser/Register';
import Unauthorized from '../pages/authUser/Unauthorized';
import PageNotFound from '../pages/authUser/PagenotFound';
import AllManga from '../pages/authUser/Allmanga';
import Home from '../pages/Home';
import Profile from '../components/user/Profile';
import MyFavorite from '../components/user/MyFavorite';
import ManageManga from '../components/user/ManageManga';
import ProtectRoute from './ProtectRoute';
import LoginProtectRoute from './LoginProtectRoute';
import CheckAuthRoute from './CheckAuthRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectRoute element={<UserLayout />} />,
    children: [
      { index: true, element: <Home /> },
      { path: 'Register', element: <Register /> },
      { path: 'login', element: <LoginProtectRoute element={<Login />} /> },

      { path: 'all', element: <AllManga /> },
      { path: 'Profile', element: <Profile /> },
      {
        path: 'MyFavorite',
        element: <CheckAuthRoute element={<MyFavorite />} />
      },
      {
        path: 'ManageManga',
        element: <CheckAuthRoute element={<ManageManga />} />
      },
      {
        path: 'unauthorize',
        element: <CheckAuthRoute element={<Unauthorized />} />
      },
      { path: '*', element: <PageNotFound /> }
    ]
  }
]);

const AppRouter = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default AppRouter;
