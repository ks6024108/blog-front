import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import changePasswordValidator from "../validators/changePasswordValidator";
import { useAuth } from "../components/context/AuthContext";
const Setting = () => {
  const initialFormData = {
    oldPassword: "",
    newPassword: "",
  };

  const initialFormError = {
    oldPassword: "",
    newPassword: "",
  };
  const navigate = useNavigate();
  const auth = useAuth();

  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = changePasswordValidator({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    });
    if (errors.oldPassword || errors.newPassword) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        //api request
        const response = await axios.put("/auth/change-password", formData);
        const data = response.data;

        toast.success(data.message, {
          position: "top-right",
          autoClose: true,
        });
        // console.log(response);
        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        window.localStorage.removeItem("blogData");
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
  };
  return (
    <div>
      <button className="button" onClick={() => navigate(-1)}>
        Go Back
      </button>
      {!auth.isVerified && (
        <button className="button" onClick={() => navigate("/verifyUser")}>
          Verify User
        </button>
      )}
      <div className="container">
        <form className="forms" onSubmit={handleSubmit}>
          <h2>Change Password</h2>

          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            id="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            autoComplete="oldPassword"
            required
          />
          {formError.oldPassword && (
            <p className="error">{formError.oldPassword}</p>
          )}

          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            autoComplete="newPassword"
            required
          />
          {formError.newPassword && (
            <p className="error">{formError.newPassword}</p>
          )}

          <button type="submit" value="Change">
            {loading ? "Changing.." : "Change"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Setting;
