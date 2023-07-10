import React, { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserSelector } from '../../redux/selectors/selectors';
import { LOGIN } from '../../utils/routes';

interface IProtectedRouteElementProps {
  children?: ReactNode;
}

const ProtectedRouteElement: FC<IProtectedRouteElementProps> = ({
  children,
}) => {
  const location = useLocation();
  const user = useSelector(getUserSelector);
  const isAuth = user.userLoginSuccess;
  return isAuth ? (
    <>{children}</>
  ) : (
    <Navigate
      to={`${LOGIN}?returnUrl=${encodeURIComponent(location.pathname)}`}
      replace
    />
  );
};

export default ProtectedRouteElement;
