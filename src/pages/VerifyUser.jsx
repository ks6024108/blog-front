import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import { useAuth } from "../components/context/AuthContext";
const VerifyUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");

  const auth = useAuth();

  const handleSendVerificationCode = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      //api request
      const response = await axios.post("/auth/send-verify-email", {
        email: auth.email,
      });
      const data = response.data;

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code) {
      try {
        setLoading2(true);

        //api request
        const response = await axios.post("/auth/verify-user", {
          email: auth.email,
          code,
        });
        const data = response.data;
        setCode("");
        setCodeError("");

        window.localStorage.removeItem("blogData");
        navigate("/login");
        toast.success(data.message, {
          position: "top-right",
          autoClose: true,
        });

        setLoading2(false);
      } catch (error) {
        setCode("");
        setCodeError("");
        setLoading2(false);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    } else {
      setCodeError("code is required");
    }
  };
  return (
    <div>
      <button className="button" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <button className="button" onClick={handleSendVerificationCode}>
        {loading ? "Sending.." : "Send Verification Code"}
      </button>
      <div className="container">
        <form className="forms" onSubmit={handleSubmit}>
          <h2>Change Password</h2>

          <label htmlFor="code">Confirmation Code</label>
          <input
            type="text"
            name="code"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoComplete="code"
            required
          />
          {codeError && <p className="error">{codeError}</p>}
          <button type="submit" value="Verify">
            {loading2 ? "Verifing.." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyUser;
