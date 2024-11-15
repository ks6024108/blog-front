import { Navigate, Outlet } from "react-router-dom";
import PublicNavbar from "../PublicNavbar";
import React from "react";
const PublicLayout = () => {
  const auth = false; //changing to true okay..

  if (auth) {
    return <Navigate to={"/"} />;
  }

  return (
    <React.Fragment>
      <PublicNavbar />
      <Outlet />
    </React.Fragment>
  );
};

export default PublicLayout;
