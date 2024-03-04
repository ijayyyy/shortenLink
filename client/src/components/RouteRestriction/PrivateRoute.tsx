import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../util/useAuth";

const PrivateRoutes = () => {
  const isLoggedIn = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
