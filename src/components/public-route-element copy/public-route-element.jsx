import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserSelector } from '../../redux/selectors/selectors';
import { HOME } from '../../utils/routes';
import PropType from 'prop-types';

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

PublicRouteElement.propTypes = {
  children: PropType.node.isRequired,
};
