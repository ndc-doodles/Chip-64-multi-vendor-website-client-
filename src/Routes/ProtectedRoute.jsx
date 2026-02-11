// src/Routes/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";


export default function ProtectedRoute({ children }) {
  const { user, accessToken } = useSelector((s) => s.user || {});
  const location = useLocation();

  const isAuthenticated = !!user && !!accessToken;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
