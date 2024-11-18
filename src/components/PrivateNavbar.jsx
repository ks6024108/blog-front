import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const PrivateNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("blogData");
    toast.success("Logout Successfully", {
      position: "top-right",
      autoClose: true,
    });
    navigate("/login");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    // <nav className="navContain">
    //   <NavLink to={"/"} className="navLinks">
    //     Home
    //   </NavLink>
    //   <NavLink to={"/categories"} className="navLinks">
    //     Categories
    //   </NavLink>
    //   <NavLink to={"/posts"} className="navLinks">
    //     Posts
    //   </NavLink>
    //   <NavLink to={"/profile"} className="navLinks">
    //     Profile
    //   </NavLink>
    //   <NavLink to={"/setting"} className="navLinks">
    //     Setting
    //   </NavLink>
    //   <NavLink to={"/login"} onClick={handleLogout} className="navLinks">
    //     Logout
    //   </NavLink>
    // </nav>

    //new code start here....
    <nav className="navbar">
      <div className="logo">Bloggy</div>
      <div className={`navLinkContainer ${isMenuOpen ? "open" : ""}`}>
        <NavLink
          to={"/categories"}
          className="navLink"
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          Categories
        </NavLink>
        <NavLink
          to={"/posts"}
          className="navLink"
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          Posts
        </NavLink>
        <NavLink
          to={"/profile"}
          className="navLink"
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          Profile
        </NavLink>
        <NavLink
          to={"/setting"}
          className="navLink"
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          Setting
        </NavLink>
        <NavLink
          to={"/login"}
          // onClick={handleLogout}
          className="navLink"
          onClick={() => {
            handleLogout();
            console.log("logging out confirm.");
            setIsMenuOpen(false);
            console.log("helo:", isMenuOpen);
          }}
        >
          Logout
        </NavLink>
      </div>
      <div className="menuToggle" onClick={toggleMenu}>
        {isMenuOpen ? "Close" : "Open"}
      </div>
    </nav>
  );
};

export default PrivateNavbar;
