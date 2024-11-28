import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import addPostValidator from "../../validators/addPostValidator";
const NewPost = () => {
  const initialFormData = {
    title: "",
    category: "",
    description: "",
    banner: null,
    updatedBy: "null",
  };

  const initialFormError = {
    title: "",
    category: "",
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        //api
        const response = await axios.get(`/category`);
        const data = response.data.data;
        setCategories(data.categories);

        console.log("resp:", response); //here
      } catch (error) {
        const response = error.response;
        const data = response.data;

        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    };
    getCategories();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setFormData({ ...formData, category: categoryId }); // Update with selected category ID
  };
  console.log(formData);

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // console.log("file", file);
    // setFormData((prev) => ({ ...prev, banner: file }));
    setFormData({ ...formData, banner: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = addPostValidator({
      title: formData.title,
      category: formData.category,
    });

    if (errors.title || errors.category) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        const formDataObj = new FormData();
        formDataObj.append("title", formData.title);
        formDataObj.append("description", formData.description);
        formDataObj.append("category", formData.category);
        formDataObj.append("banner", formData.banner);

        //api request
        // console.log(formDataObj);

        const response = await axios.post(`/blog/create`, formDataObj, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const data = response.data;
        console.log(data);
        // console.log("suc:", response.data.message);

        console.log(response);
        setFormData(initialFormData);
        setFormError(initialFormError);
        toast.success(data.message, {
          position: "top-right",
          autoClose: true,
        });
        setLoading(false);
        navigate("/posts");
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
      <div className="container">
        <form className="forms" onSubmit={handleSubmit}>
          <h2>New Post</h2>

          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            autoComplete="title"
            placeholder="Enter Post Title"
            required
          />
          {formError.title && <p className="error">{formError.title}</p>}

          <label htmlFor="description">Description</label>
          <textarea
            style={{ width: "100%" }}
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            autoComplete="description"
            placeholder="Enter Post description..."
          />

          <label htmlFor="banner">Select an Image</label>
          <input
            type="file"
            name="banner"
            id="banner"
            // value={formData.banner}
            onChange={handleFileChange}
            autoComplete="banner"
          />

          <h3 style={{ fontSize: "12px" }}>Select Category:</h3>
          <select
            className="catList"
            onChange={handleCategoryChange}
            value={formData.category}
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
          {formError.category && <p className="error">{formError.category}</p>}

          <button type="submit" value="Add" disabled={loading}>
            {loading ? "Adding.." : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
