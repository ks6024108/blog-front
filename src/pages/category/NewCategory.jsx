import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import addCategoryValidator from "../../validators/addCategoryValidator";

import { useNavigate } from "react-router-dom";

const NewCategory = () => {
  const initialFormData = {
    title: "",
    desc: "",
  };

  const initialFormError = {
    title: "",
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = addCategoryValidator({ title: formData.title });

    if (errors.title) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        //api request
        const response = await axios.post("/category", formData);
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
        navigate("/categories");
      } catch (error) {
        setLoading(false);
        const response = error.response;
        // console.log("resp::", response);
        const data = response.data;
        // console.log(data);

        // console.log("error;;;", error.response.data.message);
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div>
      <button className="button" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="container">
        <form className="forms" onSubmit={handleSubmit}>
          <h2>New Category</h2>

          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            autoComplete="title"
            placeholder="Enter Title of Category"
            required
          />
          {formError.title && <p className="error">{formError.title}</p>}

          <label htmlFor="desc">Description</label>
          <input
            type="text"
            name="desc"
            id="desc"
            value={formData.desc}
            onChange={handleChange}
            autoComplete="desc"
            placeholder="Enter description..."
          />

          <button type="submit" value="Add">
            {loading ? "Adding..." : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewCategory;
