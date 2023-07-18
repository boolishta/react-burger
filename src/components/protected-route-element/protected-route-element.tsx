import React, { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { getUserSuccessLoginSelector } from '../../services/selectors/selectors';
import { LOGIN } from '../../utils/routes';

interface IProtectedRouteElementProps {
  children?: ReactNode;
}

const ProtectedRouteElement: FC<IProtectedRouteElementProps> = ({
  children,
}) => {
  const location = useLocation();
  const isAuth = useSelector(getUserSuccessLoginSelector);
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
