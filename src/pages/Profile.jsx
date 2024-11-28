import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import profileValidator from "../validators/profileValidator";
import moment from "moment";
//line 501
const initialFormData = {
  name: "",
  email: "",
};

const initialFormError = {
  name: "",
  email: "",
};
const Profile = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);

  const [oldEmail, setOldEmail] = useState(null);
  const [userId, setUserId] = useState("");
  const [categories, setCategories] = useState([]);

  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);

  const [pageSize, setPageSize] = useState(5);
  const [searchValue, setSearchValue] = useState("");

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [filteredPost, setFilteredPost] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        //api
        const response = await axios.get(`/auth/current-user`);
        console.log("re:", response);

        const data = response.data.data;
        setUserId(data.user._id);
        console.log("d:", data);
        setFormData({ name: data.user.name, email: data.user.email });
        setOldEmail(data.user.email);
      } catch (error) {
        const response = error.response;
        const data = response.data;

        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);

        //api
        const response = await axios.get(
          `/category?page=${currentPage}&size=${pageSize}`
        );
        const data = response.data.data;
        setCategories(data.categories);
        setLoading(false);
        console.log(response);
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
    getCategories();
  }, [currentPage, pageSize]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);

        //api
        const response = await axios.get(
          `/blog?page=${currentPage}&size=${pageSize}&q=${searchValue}`
        );
        const data = response.data.data;
        setPosts(data.blogs);

        setTotalPage(data.pages);
        setLoading(false);
        console.log(response); //here
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
    getPosts();
  }, [currentPage]);

  useEffect(() => {
    if (totalPage > 1) {
      let tempPageCount = [];

      for (let i = 1; i <= totalPage; i++) {
        tempPageCount = [...tempPageCount, i];
      }
      setPageCount(tempPageCount);
    } else {
      setPageCount([]);
    }
  }, [totalPage]);

  useEffect(() => {
    // Filter categories by userId
    const filtered = categories.filter(
      (category) => category.updatedBy === userId
    );
    setFilteredCategories(filtered);
  }, [categories, userId]);

  useEffect(() => {
    // Filter posts by userId
    const filtered = posts.filter((post) => post.updatedBy === userId);
    setFilteredPost(filtered);
  }, [posts, userId]);

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = async (e) => {
    try {
      const input = e.target.value;
      setSearchValue(input);

      const response = await axios.get(
        `/category?q=${input}&page=${currentPage}`
      );
      const data = response.data.data;
      setCategories(data.categories);
      setTotalPage(data.pages);
    } catch (error) {
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
  };
  const handleSearchPost = async (e) => {
    try {
      const input = e.target.value;
      setSearchValue(input);

      const response = await axios.get(`/blog?q=${input}&page=${currentPage}`);
      const data = response.data.data;
      setPosts(data.blogs);
      setTotalPage(data.pages);
    } catch (error) {
      const response = error.response;
      const data = response.data;

      toast.error(data.message, {
        position: "top-right",
        autoClose: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/category/${categoryId}`);
      setPopupVisible(false);

      const data = response.data;

      toast.success(data.message, {
        position: "top-right",
        autoClose: true,
      });

      //check if load or not written start
      const response2 = await axios.get(
        `/category?q=${searchValue}&page=${currentPage}`
      );
      const data2 = response2.data.data;
      setCategories(data2.categories);
      setTotalPage(data2.pages);
      //check if load or not written end
    } catch (error) {
      setPopupVisible(false);

      const response = error.response;
      const data = response.data;

      toast.error(data.message, {
        position: "top-right",
        autoClose: true,
      });
    }
  };
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setPageSize(e.target.value);
  };
  console.log(userId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = profileValidator({
      name: formData.name,
      email: formData.email,
    });
    if (errors.name || errors.email) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        //api request
        const response = await axios.put("/auth/update-profile", formData);
        const data = response.data;
        // console.log("suc:", response.data.message);
        toast.success(data.message, {
          position: "top-right",
          autoClose: true,
        });
        // console.log(response);
        setFormError(initialFormError);
        setLoading(false);

        if (oldEmail !== formData.email) {
          window.localStorage.removeItem("blogData");
          navigate("/login");
        }
        navigate("/");
      } catch (error) {
        setLoading(false);
        setFormError(initialFormError);
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

  console.log(categories);
  return (
    <div>
      <div>
        <button className="button" onClick={() => navigate(-1)}>
          Go Back
        </button>
        <div className="container">
          <form className="forms" onSubmit={handleSubmit}>
            <h2>Update Profile</h2>

            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              placeholder="Enter Name"
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
              placeholder="johndoe2003@gmail.com"
            />
            {formError.email && <p className="error">{formError.name}</p>}

            <button type="submit" value="Change">
              {loading ? "changing.." : "Change"}
            </button>
          </form>
        </div>
      </div>
      <div className="categoryListContainer">
        <button
          className="button"
          onClick={() => navigate("/categories/newCategory")}
        >
          Add Category
        </button>
        <h2 className="categoryTableTitle">Category List</h2>
        <input
          className="searchInput"
          type="text"
          name="search"
          placeholder="Search here"
          onChange={handleSearch}
        />
        <h3>Select page size for categories</h3>
        <select
          className="pageSizeSelect"
          value={pageSize}
          onChange={handleChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="tableWrapper">
            <table className="responsiveTable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th className="notDisplay">Created At</th>
                  <th className="notDisplay">Updated At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category._id}>
                    <td>{category.title}</td>
                    <td>{category.desc}</td>
                    <td className="notDisplay">
                      {moment(category.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                    </td>
                    <td className="notDisplay">
                      {moment(category.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
                    </td>
                    <td>
                      <button
                        className="button"
                        onClick={() =>
                          navigate(`updateCategory/${category._id}`)
                        }
                      >
                        Update
                      </button>
                      <button
                        className="button deleteButton"
                        onClick={() => {
                          setPopupVisible(true);
                          setCategoryId(category._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {pageCount.length > 0 && (
          <div className="pageContainer">
            <button
              className="pageButton"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {pageCount.map((pageNumber, index) => (
              <button
                className="pageButton"
                key={index}
                onClick={() => handlePage(pageNumber)}
                style={{
                  backgroundColor: currentPage === pageNumber ? "#ccc" : "",
                }}
              >
                {pageNumber}
              </button>
            ))}
            <button
              className="pageButton"
              onClick={handleNext}
              disabled={currentPage === totalPage}
            >
              Next
            </button>
          </div>
        )}

        {/* pop up and deleting here... */}
        <div className="popupContainer">
          {isPopupVisible && (
            <div className="popupOverlay">
              <div className="popupBox">
                {/* Close Button */}
                <button
                  onClick={() => setPopupVisible(false)}
                  className="closeButton"
                >
                  &times;
                </button>

                {/* Popup Content */}
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete this category?</p>

                {/* Action Buttons */}
                <div className="popupActions">
                  <button
                    onClick={() => setPopupVisible(false)}
                    className="actionButton cancel"
                  >
                    No
                  </button>
                  <button
                    onClick={handleDelete}
                    className="actionButton confirm"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="postPage">
        <button className="button" onClick={() => navigate("/posts/newPost")}>
          Add New Post
        </button>
        <h2 className="postTitle">Post List</h2>
        <input
          className="searchInput"
          type="text"
          name="search"
          placeholder="Search here"
          onChange={handleSearchPost}
        />
        <h3>Select page size for posts</h3>
        <select
          className="pageSizeSelect"
          value={pageSize}
          onChange={handleChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="postContainer">
            {filteredPost.map((post) => (
              <div
                key={post._id}
                className="postCard"
                onClick={() => navigate(`/detailPost/${post._id}`)}
              >
                <h4 className="cardTitle">{post.title}</h4>
                <p className="cardDescription">{post.description}</p>
                <img
                  className="cardImg"
                  alt="mern"
                  src={post.banner}
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            ))}
          </div>
        )}
        {pageCount.length > 0 && (
          <div className="pageContainer">
            <button
              className="pageButton"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {pageCount.map((pageNumber, index) => (
              <button
                className="pageButton"
                key={index}
                onClick={() => handlePage(pageNumber)}
                style={{
                  backgroundColor: currentPage === pageNumber ? "#ccc" : "",
                }}
              >
                {pageNumber}
              </button>
            ))}
            <button
              className="pageButton"
              onClick={handleNext}
              disabled={currentPage === totalPage}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
