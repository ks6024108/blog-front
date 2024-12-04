import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import moment from "moment";
// import "../../assets/css/detailPost.css"
const DetailPost = () => {
  const params = useParams();
  const postId = params.id;
  const navigate = useNavigate();

  const initialFormData = {
    title: "",
    category: "",
    description: "",
    banner: "",
    createdAt: "",
    updatedAt: "",
    updatedBy: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (postId) {
      const getPost = async () => {
        try {
          //api
          setLoading(true);
          const response = await axios.get(`/blog/${postId}`);
          console.log("resp::", response);
          const data = response.data.data;
          console.log("data:", data);
          setFormData({
            title: data.blog.title,
            description: data.blog.description,
            banner: data.blog.banner,
            createdAt: data.blog.createdAt,
            updatedAt: data.blog.updatedAt,
            category: data.blog.category.title,
            updatedBy: data.blog.updatedBy.name,
          });
          setLoading(false);
        } catch (error) {
          const response = error.response;
          const data = response.data;

          toast.error(data.message, {
            position: "top-right",
            autoClose: true,
          });
        }
      };
      getPost();
    }
  }, [postId]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`/blog/delete/${postId}`);
      setPopupVisible(false);

      const data = response.data;

      toast.success(data.message, {
        position: "top-right",
        autoClose: true,
      });

      setLoading(false);
      navigate("/posts");
    } catch (error) {
      setLoading(false);
      setPopupVisible(false);

      const response = error.response;
      const data = response.data;

      toast.error(data.message, {
        position: "top-right",
        autoClose: true,
      });
    }
  };
  return (
    <div>
      <button className="button" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <button
        className="button"
        onClick={() => navigate(`/posts/updatePost/${postId}`)}
      >
        Update Post
      </button>
      <button
        className="button deleteButton"
        onClick={() => {
          setPopupVisible(true);
        }}
      >
        Delete
      </button>
      {loading && <p className="loading">Loading...</p>}
      <div className="detailContainer">
        <h2 className="postTitle">{formData.title}</h2>
        <h5 className="postCategory">Category:{formData.category}</h5>
        <h5 className="postCategory">
          Created At:{moment(formData.createdAt).format("YYYY-MM-DD HH:mm:ss")}
        </h5>
        <h5 className="postCategory">
          Updated At:{moment(formData.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
        </h5>
        <h5 className="postCategory">Updated By:{formData.updatedBy}</h5>

        <p className="postDescription truncatedDescription">{formData.description}</p>
        <img src={formData.banner} alt="mern" />
      </div>
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
                <button onClick={handleDelete} className="actionButton confirm">
                  {loading ? "Deleting.." : "Yes"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPost;
