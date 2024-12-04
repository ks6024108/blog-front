import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://blog-website-izfp.onrender.com/api/v1`,
});

axiosInstance.interceptors.request.use((req) => {
  const stringfyBlogData = window.localStorage.getItem("blogData");
  if (stringfyBlogData) {
    const blogData = JSON.parse(stringfyBlogData);
    const token = blogData.token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default axiosInstance;
