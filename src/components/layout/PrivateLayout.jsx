import { Navigate, Outlet } from "react-router-dom";
import PrivateNavbar from "../PrivateNavbar";
import React from "react";
const PrivateLayout = () => {
  const auth = true;

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
