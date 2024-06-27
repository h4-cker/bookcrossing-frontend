import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage.jsx";
import ContentPage from "./pages/ContentPage.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<ContentPage />} />
        <Route path="/auth/register" element={<Navigate replace to="/" />} />
        <Route path="/auth/login" element={<Navigate replace to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<ContentPage />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
    </Routes>
  );
};
