import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PublicRouteElement = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          children
        ) : (
          <Navigate
            to={{
              pathname: '/home',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PublicRouteElement;
