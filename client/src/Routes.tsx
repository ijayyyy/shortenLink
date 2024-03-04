import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./components/pages/LogIn";
import SignUp from "./components/pages/SignUp";
import PrivateRoutes from "./components/RouteRestriction/PrivateRoute";
import Home from "./components/pages/Home";
import Contact from "./components/pages/ContactPage";
import Profile from "./components/pages/Profile";
import Dashboard from "./components/pages/Dashboard";
import useAuth from "./util/useAuth"; // Import useAuth hook

function MainRoutes() {
  const isLoggedIn = useAuth(); // Check if user is logged in

  return (
    <Routes>
      {/* Public routes accessible without login */}
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Private routes accessible only after login */}
      <Route
        path="/*"
        element={isLoggedIn ? <PrivateRoutes /> : <Navigate to="/login" />}
      />

      {/* Default redirect from "/" to "/home" */}
      <Route path="/" element={<Navigate to="/home" />} />

      {/* Private routes */}
      <Route path="/home" element={<Home />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default MainRoutes;
