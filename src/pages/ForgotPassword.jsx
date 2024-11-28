import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import sendCodeValidator from "../validators/sendCodeValidator";
import recoverPasswordValidator from "../validators/recoverPasswordValidator";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const initialFormData = {
    code: "",
    email: "",
    password: "",
  };

  const initialFormError = {
    code: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [hasEmail, setHasEmail] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    console.log("func called hsc");
    const errors = sendCodeValidator({ email: formData.email });
    if (errors.email) {
      setEmailError(errors.email);
    } else {
      try {
        setLoading(true);

        //api request
        const response = await axios.post("/auth/forgot-password-code", {
          email: formData.email,
        });
        console.log(response);
        const data = response.data;
        setHasEmail(true);
        toast.success(data.message, {
          position: "top-right",
          autoClose: true,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    }
  };

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    console.log("ddd", formData);
    const errors = recoverPasswordValidator({
      code: formData.code,
      password: formData.password,
    });
    console.log("fo:", formData);
    console.log("err:", errors);
    if (errors.code || errors.password) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        console.log("f", formData);
        //api request
        const response = await axios.post("/auth/recover-password", formData);
        console.log("resp:", response);
        const data = response.data;
        toast.success(data.message, {
          position: "top-right",
          autoClose: true,
        });
        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        navigate("/login");
      } catch (error) {
        setLoading(false);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    }
    console.log(formData);
    console.log(formError);
  };

  return (
    <div>
      <div className="container">
        <form
          className="forms"
          onSubmit={!hasEmail ? handleSendCode : handleRecoverPassword}
        >
          <h2>{`${!hasEmail ? "Recover Password" : "New Password"}`}</h2>
          {!hasEmail ? (
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="johndoe2003@gmail.com"
              />
              {emailError && <p className="error">{emailError}</p>}
            </div>
          ) : (
            <div>
              <label htmlFor="code">Code</label>
              <input
                type="text"
                name="code"
                id="code"
                value={formData.code}
                onChange={handleChange}
                autoComplete="code"
                placeholder="123456"
                required
              />
              {formError.code && <p className="error">{formError.code}</p>}

              <label htmlFor="password">New Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="password"
                placeholder="******"
                required
              />
              {formError.password && (
                <p className="error">{formError.password}</p>
              )}
            </div>
          )}

          <button type="submit" value="Send">
            {loading ? "Sending.." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
