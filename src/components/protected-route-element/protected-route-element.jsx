import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRouteElement = ({ children }) => {
  const location = useLocation();
  const isAuth = !!localStorage.getItem('refreshToken');
  return isAuth ? (
    children
  ) : (
    <Navigate
      to={`/login?returnUrl=${encodeURIComponent(location.pathname)}`}
      replace
    />
  );
};

export default ProtectedRouteElement;
