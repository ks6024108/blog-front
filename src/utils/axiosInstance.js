import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:5513/api/v1" });

export default axiosInstance;
