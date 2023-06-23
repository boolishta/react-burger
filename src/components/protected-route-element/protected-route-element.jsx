import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserSelector } from '../../redux/selectors/selectors';
import { LOGIN } from '../../utils/routes';
import PropType from 'prop-types';

const ProtectedRouteElement = ({ children }) => {
  const location = useLocation();
  const user = useSelector(getUserSelector);
  const isAuth = user.userLoginSuccess;
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

ProtectedRouteElement.propTypes = {
  children: PropType.node.isRequired,
};
