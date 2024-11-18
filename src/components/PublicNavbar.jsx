import { NavLink } from "react-router-dom";

const PublicNavbar = () => {
  return (
    // <nav className="navContain">
    //   <NavLink to={"/login"} className="navLinks">
    //     Login
    //   </NavLink>
    //   <NavLink to={"/signup"} className="navLinks">
    //     Signup
    //   </NavLink>
    // </nav>
    <nav className="navbar">
      <div className="logo">Bloggy</div>
      <div className="publicNavLinkContainer">
        <NavLink to={"/login"} className="pubNavLink">
          Login
        </NavLink>

        <NavLink to={"/signup"} className="pubNavLink">
          Signup
        </NavLink>
      </div>
    </nav>
  );
};

export default PublicNavbar;
