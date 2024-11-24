import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import addCategoryValidator from "../../validators/addCategoryValidator";
const UpdateCategory = () => {
  const navigate = useNavigate();
  const params = useParams();
  const categoryId = params.id;

  const initialFormData = {
    title: "",
    desc: "",
  };

  const initialFormError = {
    title: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categoryId) {
      const getCategory = async () => {
        try {
          //api
          const response = await axios.get(`/category/${categoryId}`);
          const data = response.data.data;
          setFormData({
            title: data.category.title,
            desc: data.category.desc,
          });
        } catch (error) {
          const response = error.response;
          const data = response.data;

          toast.error(data.message, {
            position: "top-right",
            autoClose: true,
          });
        }
      };
      getCategory();
    }
  }, [categoryId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = addCategoryValidator({ title: formData.title });

    if (errors.title) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        //api request
        const response = await axios.put(`/category/${categoryId}`, formData);
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
          <h2>Update Category</h2>

          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            autoComplete="title"
            placeholder="Enter new Title"
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
            placeholder="Enter new description..."
          />

          <button type="submit" value="Update">
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
