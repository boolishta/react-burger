import React from 'react';
import { Navigate } from 'react-router-dom';
import { HOME } from '../../utils/routes';

const PublicRouteElement = ({ children }) => {
  const isAuth = !!localStorage.getItem('refreshToken');
  return !isAuth ? (
    children
  ) : (
    <Navigate
      to={HOME}
      replace
    />
  );
};

export default PublicRouteElement;
