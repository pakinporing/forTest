import React from 'react';
import useAuthStore from '../zustand/auth-store';
import { Navigate } from 'react-router-dom';

export default function CheckAuthRoute(props) {
  const { element } = props;

  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/" />;
  }

  return element;
}
