import { Navigate, Outlet } from "react-router-dom";
import PrivateNavbar from "../PrivateNavbar";
import React from "react";
import { useAuth } from "../context/AuthContext";
const PrivateLayout = () => {
  const auth = useAuth();

  if (!auth) {
    return <Navigate to={"/login"} />;
  }

  return (
    <React.Fragment>
      <PrivateNavbar />
      <Outlet />
    </React.Fragment>
  );
};

export default PrivateLayout;
