import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LOGIN } from '../../utils/routes';

const ProtectedRouteElement = ({ children }) => {
  const location = useLocation();
  const isAuth = !!localStorage.getItem('refreshToken');
  return isAuth ? (
    children
  ) : (
    <Navigate
      to={`${LOGIN}?returnUrl=${encodeURIComponent(location.pathname)}`}
      replace
    />
  );
};

export default ProtectedRouteElement;
