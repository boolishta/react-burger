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
  FeedPage,
  FeedDetailsPage,
} from '../../pages';
import {
  FEED,
  FORGOT_PASSWORD,
  HOME,
  LOGIN,
  PROFILE,
  REGISTER,
  RESET_PASSWORD,
} from '../../utils/routes';
import OrdersHistory from '../orders-history/orders-history';
import Orders from '../orders/orders';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import PublicRouteElement from '../public-route-element copy/public-route-element';
import { Settings } from '../settings/settings';

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
        >
          <Route
            path=""
            element={<Settings />}
          />
          <Route
            path="orders"
            element={<OrdersHistory />}
          />
          <Route
            path="orders/:number"
            element={<FeedDetailsPage />}
          />
        </Route>
        <Route
          path={HOME}
          element={<HomePage />}
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
        <Route
          exact
          path="/ingredients/:id"
          element={<IngredientPage />}
        />
        <Route
          path={FEED}
          element={<FeedPage />}
        />
        <Route
          path={`${FEED}/:number`}
          element={<FeedDetailsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
