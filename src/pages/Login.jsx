import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import LoginValidator from "../validators/loginValidator";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const initialFormData = {
    email: "",
    password: "",
  };

  const initialFormError = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = LoginValidator({
      email: formData.email,
      password: formData.password,
    });
    if (errors.email || errors.password) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        //api request
        const response = await axios.post("/auth/signin", formData);
        const data = response.data;

        //store info to local storage
        window.localStorage.setItem("blogData", JSON.stringify(data.data));
        // console.log("suc:", response.data.message);
        toast.success(data.message, {
          position: "top-right",
          autoClose: true,
        });
        // console.log(response);
        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        navigate("/");
      } catch (error) {
        setLoading(false);
        const response = error.response;
        // console.log("resp::", response);
        const data = response.data;
        // console.log(data);

        if (data.password) {
          toast.error(data.password, {
            position: "top-right",
            autoClose: true,
          });
        }
        // console.log("error;;;", error.response.data.message);
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
        // console.log(error.message);
      }
    }
    // console.log(formData);
    // console.log(formError);
  };

  return (
    <div className="container">
      <form className="forms" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
        {formError.email && <p className="error">{formError.email}</p>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="password"
          placeholder="Enter Your Password Correctly .."
          required
        />
        {formError.password && <p className="error">{formError.password}</p>}
        <Link className="forgotPassword" to="/forgotPassword">Forgot Password</Link>
        <button type="submit" value="Login">
          {loading ? "Logging..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
