import React from "react";
import { Navigate } from "react-router";

function PrivateRoute({ children }) {
  // take the var and check
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default PrivateRoute;
