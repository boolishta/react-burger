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
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import PublicRouteElement from '../public-route-element copy/public-route-element';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement>
              <ProfilePage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRouteElement>
              <HomePage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRouteElement>
              <LoginPage />
            </PublicRouteElement>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRouteElement>
              <RegisterPage />
            </PublicRouteElement>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRouteElement>
              <ResetPasswordPage />
            </PublicRouteElement>
          }
        />
        <Route
          path="/forgot-password"
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
