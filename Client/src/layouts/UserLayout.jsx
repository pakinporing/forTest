import React from 'react';
import { Outlet } from 'react-router-dom';
import UserFooter from '../components/user/UserFooter';
import UserHeader from '../components/user/UserHeader';
import useAuthStore from '../zustand/auth-store';

const UserLayout = () => {
  const user = useAuthStore((state) => state.user);

  console.log('user jaa', user);

  return (
    <div>
      <UserHeader />
      <Outlet />
      <UserFooter />
    </div>
  );
};

export default UserLayout;
