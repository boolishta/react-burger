import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { getUserSuccessLoginSelector } from '../../services/selectors/selectors';
import { HOME } from '../../utils/routes';

interface IPublicRouteElementProps {
  children: ReactNode;
}

const PublicRouteElement: FC<IPublicRouteElementProps> = ({ children }) => {
  const isAuth = useSelector(getUserSuccessLoginSelector);
  return !isAuth ? (
    <>{children}</>
  ) : (
    <Navigate
      to={HOME}
      replace
    />
  );
};

export default PublicRouteElement;
