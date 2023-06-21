import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserSelector } from '../../redux/selectors/selectors';
import { HOME } from '../../utils/routes';

const PublicRouteElement = ({ children }) => {
  const user = useSelector(getUserSelector);
  const isAuth = user.userLoginSuccess;
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
