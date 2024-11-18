import { useState } from "react";
import { toast } from "react-toastify";
import signupValidator from "../validators/signupValidator";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const initialFormError = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = signupValidator({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
    if (
      errors.name ||
      errors.email ||
      errors.password ||
      errors.confirmPassword
    ) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        const requestBody = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };
        //api request
        const response = await axios.post("/auth/signup", requestBody);
        const data = response.data;
        // console.log("suc:", response.data.message);
        toast.success(data.message, {
          position: "top-right",
          autoClose: true,
        });
        // console.log(response);
        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        navigate("/login");
      } catch (error) {
        setLoading(false);
        const response = error.response;
        console.log(response);
        const data = response.data;
        console.log(data);
        // console.log("error;;;", error.response.data.message);
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
        // console.log(error.message);
      }
    }
    console.log(formData);
    console.log(formError);
  };
  return (
    <div className="container">
      <form className="forms" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          autoComplete="name"
          required
        />
        {formError.name && <p className="error">{formError.name}</p>}
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
          required
        />
        {formError.password && <p className="error">{formError.password}</p>}

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          autoComplete="confirmPassword"
          required
        />
        {formError.confirmPassword && (
          <p className="error">{formError.confirmPassword}</p>
        )}

        <button type="submit" value="SignUp">
          {loading ? "Saving..." : "SignUp"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
