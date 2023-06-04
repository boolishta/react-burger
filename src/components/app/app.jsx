import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  ForgotPasswordPage,
  ProfilePage,
} from '../../pages';
import {
  FORGOT_PASSWORD,
  HOME,
  LOGIN,
  PROFILE,
  REGISTER,
  RESET_PASSWORD,
} from '../../utils/routes';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import PublicRouteElement from '../public-route-element copy/public-route-element';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={PROFILE}
          element={
            <ProtectedRouteElement>
              <ProfilePage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path={HOME}
          element={
            <ProtectedRouteElement>
              <HomePage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path={LOGIN}
          element={
            <PublicRouteElement>
              <LoginPage />
            </PublicRouteElement>
          }
        />
        <Route
          path={REGISTER}
          element={
            <PublicRouteElement>
              <RegisterPage />
            </PublicRouteElement>
          }
        />
        <Route
          path={RESET_PASSWORD}
          element={
            <PublicRouteElement>
              <ResetPasswordPage />
            </PublicRouteElement>
          }
        />
        <Route
          path={FORGOT_PASSWORD}
          element={
            <PublicRouteElement>
              <ForgotPasswordPage />
            </PublicRouteElement>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
