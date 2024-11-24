import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PrivateLayout from "./components/layout/PrivateLayout";
import CategoryList from "./pages/category/CategoryList";
import PostList from "./pages/post/PostList";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import PublicLayout from "./components/layout/PublicLayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NewCategory from "./pages/category/NewCategory";
import UpdateCategory from "./pages/category/UpdateCategory";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/newCategory" element={<NewCategory />} />
          <Route
            path="categories/updateCategory/:id"
            element={<UpdateCategory />}
          />

          <Route path="posts" element={<PostList />} />
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Setting />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
