import { Navigate, Outlet } from "react-router-dom";
import PublicNavbar from "../PublicNavbar";
import React from "react";
import { useAuth } from "../context/AuthContext";
const PublicLayout = () => {
  // const auth = useAuth();

  // if (auth) {
  //   return <Navigate to={"/"} />;
  // }

  return (
    <React.Fragment>
      <PublicNavbar />
      <Outlet />
    </React.Fragment>
  );
};

export default PublicLayout;
