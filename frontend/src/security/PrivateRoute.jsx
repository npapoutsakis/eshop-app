import React from "react";
import { Navigate } from "react-router";

function PrivateRoute({ children, requiredRole }) {
  // take the var and check
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const userRole = localStorage.getItem("role");

  if (isAuthenticated && userRole !== requiredRole)
    return <Navigate to={`/${userRole.toLocaleLowerCase()}`} replace />;

  return isAuthenticated ? children : <Navigate to="/" />;
}

export default PrivateRoute;
