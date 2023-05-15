import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage } from '../../pages';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
