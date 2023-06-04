import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRouteElement = ({ children }) => {
  const isAuth = !!localStorage.getItem('refreshToken');
  return !isAuth ? (
    children
  ) : (
    <Navigate
      to={'/'}
      replace
    />
  );
};

export default PublicRouteElement;
