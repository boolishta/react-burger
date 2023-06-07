import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  ForgotPasswordPage,
  ProfilePage,
  IngredientPage,
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
        {/* TODO: /reset-password доступен неавторизованным пользователям только после посещения маршрута /forgot-
password и ввода адреса электронной почты для восстановления пароля. */}
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
        <Route
          exact
          path="/ingredients/:id"
          element={<IngredientPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
