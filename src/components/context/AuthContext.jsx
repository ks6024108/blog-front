import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const stringfyBlogData = window.localStorage.getItem("blogData");

    if (stringfyBlogData) {
      const blogData = JSON.parse(stringfyBlogData);
      const user = blogData.user;
      setAuth(user);
    } else {
      setAuth(null);
    }
  }, [navigate, location]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

//will work on this later
export const useAuth = () => {
  const auth = useContext(AuthContext);
  // console.log("a", auth);
  return auth;
};
