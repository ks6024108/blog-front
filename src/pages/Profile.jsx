import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import profileValidator from "../validators/profileValidator";
import moment from "moment";
import useCategoryList from "../assets/extra/useCategoryList";
import usePostList from "../assets/extra/usePostList";
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
  const [role, setRole] = useState(null);

  const {
    categories,
    loading,
    totalPage,
    currentPage,
    pageSize,
    // searchValue,
    isPopupVisible,
    setPopupVisible,
    setCategoryId,
    setPageSize,
    setSearchValue,
    handlePrev,
    handleNext,
    handlePage,
    deleteCategory,
  } = useCategoryList();
  const { posts } = usePostList();

  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading2, setLoading2] = useState(false);

  const [oldEmail, setOldEmail] = useState(null);
  const [userId, setUserId] = useState("");
  // const [categories, setCategories] = useState([]);

  // const [totalPage, setTotalPage] = useState(1);
  // const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);

  // const [pageSize, setPageSize] = useState(5);
  // const [searchValue, setSearchValue] = useState("");

  // const [isPopupVisible, setPopupVisible] = useState(false);
  // const [categoryId, setCategoryId] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const stringfyBlogData = window.localStorage.getItem("blogData");
    const blogData = JSON.parse(stringfyBlogData);
    setRole(blogData.user.role);
    console.log(blogData.user.role);
  }, []);

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

  // useEffect(() => {
  //   const getCategories = async () => {
  //     try {
  //       setLoading(true);

  //       //api
  //       const response = await axios.get(
  //         `/category?page=${currentPage}&size=${pageSize}`
  //       );
  //       const data = response.data.data;
  //       setCategories(data.categories);
  //       setLoading(false);
  //       console.log(response);
  //     } catch (error) {
  //       setLoading(false);
  //       const response = error.response;
  //       const data = response.data;
  //       toast.error(data.message, {
  //         position: "top-right",
  //         autoClose: true,
  //       });
  //     }
  //   };
  //   getCategories();
  // }, [currentPage, pageSize]);

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
    if (role == 2 || role == 3) {
      const filteredCat = categories.filter(
        (category) => category.updatedBy === userId
      );

      setFilteredCategories(filteredCat);
    }
  }, [categories, userId, role]);

  useEffect(() => {
    // Filter posts by userId
    if (role == 2 || role == 3) {
      const filteredPosts = posts.filter(
        (post) => post.updatedBy._id === userId
      );
      setFilteredPosts(filteredPosts);
    }
  }, [userId, posts, role]);

  console.log(posts);
  console.log(filteredPosts);
  // const handlePrev = () => {
  //   setCurrentPage((prev) => prev - 1);
  // };
  // const handleNext = () => {
  //   setCurrentPage((prev) => prev + 1);
  // };

  // const handlePage = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  // const handleSearch = async (e) => {
  //   try {
  //     const input = e.target.value;
  //     setSearchValue(input);

  //     const response = await axios.get(
  //       `/category?q=${input}&page=${currentPage}`
  //     );
  //     const data = response.data.data;
  //     setCategories(data.categories);
  //     setTotalPage(data.pages);
  //   } catch (error) {
  //     const response = error.response;
  //     // console.log("resp::", response);
  //     const data = response.data;
  //     // console.log(data);

  //     // console.log("error;;;", error.response.data.message);
  //     toast.error(data.message, {
  //       position: "top-right",
  //       autoClose: true,
  //     });
  //   }
  // };

  // const handleDelete = async () => {
  //   try {
  //     const response = await axios.delete(`/category/${categoryId}`);
  //     setPopupVisible(false);

  //     const data = response.data;

  //     toast.success(data.message, {
  //       position: "top-right",
  //       autoClose: true,
  //     });

  //     //check if load or not written start
  //     const response2 = await axios.get(
  //       `/category?q=${searchValue}&page=${currentPage}`
  //     );
  //     const data2 = response2.data.data;
  //     setCategories(data2.categories);
  //     setTotalPage(data2.pages);
  //     //check if load or not written end
  //   } catch (error) {
  //     setPopupVisible(false);

  //     const response = error.response;
  //     const data = response.data;

  //     toast.error(data.message, {
  //       position: "top-right",
  //       autoClose: true,
  //     });
  //   }
  // };
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // setPageSize(e.target.value);
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
        setLoading2(true);

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
        setLoading2(false);

        if (oldEmail !== formData.email) {
          window.localStorage.removeItem("blogData");
          navigate("/login");
        }
        navigate("/login");
      } catch (error) {
        setLoading2(false);
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

  console.log(posts);
  console.log(filteredPosts);
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

      {(role == 1 || role == 2) && (
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
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <h3>Select page size for categories</h3>
          <select
            className="pageSizeSelect"
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
          {loading2 ? (
            <p>Loading...</p>
          ) : (
            <div className="tableWrapper">
              <table className="responsiveTable">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th className="hidesc">Created At</th>
                    <th className="hidesc">Updated At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((category) => (
                    <tr key={category._id}>
                      <td>{category.title}</td>
                      <td>{category.desc}</td>
                      <td className="hidesc">
                        {moment(category.createdAt).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )}
                      </td>
                      <td className="hidesc">
                        {moment(category.updatedAt).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )}
                      </td>
                      <td>
                        <button
                          className="button"
                          onClick={() =>
                            navigate(
                              `/categories/updateCategory/${category._id}`
                            )
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
                      onClick={deleteCategory}
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
      )}

      <div className="postContainer">
        {loading2 && <p className="loading">Loading...</p>}
        {(role == 2 || role == 1) && (
          <div className="postContainer">
            {filteredPosts.map((post) => (
              <div
                key={post._id}
                className="postCard"
                onClick={() => navigate(`/posts/detailPost/${post._id}`)}
              >
                <h4 className="cardTitle">{post.title}</h4>
                <p className="cardDescription">
                  {post.description.split(" ").slice(0, 10).join(" ") + "..."}
                </p>
                <img className="cardImg" alt="mern" src={post.banner} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

//  {
//    loading2 ? (
//      <p>Loading...</p>
//    ) : (
//      <div className="postContainer">
//        {filteredPosts.map((post) => (
//          <div
//            key={post._id}
//            className="postCard"
//            onClick={() => navigate(`/posts/detailPost/${post._id}`)}
//          >
//            <h4 className="cardTitle">{post.title}</h4>
//            <p className="cardDescription">{post.description}</p>
//            <img
//              className="cardImg"
//              alt="mern"
//              src={post.banner}
//              style={{ width: "100px", height: "100px" }}
//            />
//          </div>
//        ))}
//      </div>
//    );
//  }
