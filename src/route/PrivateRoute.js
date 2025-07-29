import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ user, children }) => {
  // user값이 있으면 TodoPage, 없다면 redirect to /login
  return user ? children : <Navigate to="/login" />;
};
