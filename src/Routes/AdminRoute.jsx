// src/Routes/AdminRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";


export default function AdminRoute({ children }) {
  const admin = useSelector((s) => s.admin?.admin ?? s.admin); 
  const location = useLocation();

  const isAdmin = !!admin;

  if (!isAdmin) {
    return <Navigate to="/admin" replace state={{ from: location }} />;
  }

  return children;
}
