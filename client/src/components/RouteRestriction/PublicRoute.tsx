import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../../util/useAuth";

const PublicRoutes = () => {
  const isLoggedIn = useAuth();

  return isLoggedIn ? <Navigate to="/Home" /> : <Outlet />;
};

export default PublicRoutes;
