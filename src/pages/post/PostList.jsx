// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axios from "../../utils/axiosInstance";
// import { useNavigate } from "react-router-dom";
// // import "../../assets/css/detailPost.css"
// const PostList = () => {
//   const navigate = useNavigate();
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [totalPage, setTotalPage] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageCount, setPageCount] = useState([]);

//   const [pageSize, setPageSize] = useState(5);
//   const [searchValue, setSearchValue] = useState("");

//   useEffect(() => {
//     const getPosts = async () => {
//       try {
//         setLoading(true);

//         //api
//         const response = await axios.get(
//           `/blog?page=${currentPage}&size=${pageSize}&q=${searchValue}`
//         );
//         const data = response.data.data;
//         setPosts(data.blogs);

//         setTotalPage(data.pages);
//         setLoading(false);
//         console.log(response); //here
//       } catch (error) {
//         setLoading(false);
//         const response = error.response;
//         const data = response.data;

//         toast.error(data.message, {
//           position: "top-right",
//           autoClose: true,
//         });
//       }
//     };
//     getPosts();
//   }, [currentPage]); //pageSize

//   useEffect(() => {
//     if (totalPage > 1) {
//       let tempPageCount = [];

//       for (let i = 1; i <= totalPage; i++) {
//         tempPageCount = [...tempPageCount, i];
//       }
//       setPageCount(tempPageCount);
//     } else {
//       setPageCount([]);
//     }
//   }, [totalPage]);

//   const handlePrev = () => {
//     setCurrentPage((prev) => prev - 1);
//   };
//   const handleNext = () => {
//     setCurrentPage((prev) => prev + 1);
//   };

//   const handlePage = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleChange = (e) => {
//     setPageSize(e.target.value);
//   };
//   const handleSearch = async (e) => {
//     try {
//       const input = e.target.value;
//       setSearchValue(input);

//       const response = await axios.get(`/blog?q=${input}&page=${currentPage}`);
//       const data = response.data.data;
//       setPosts(data.blogs);
//       setTotalPage(data.pages);
//     } catch (error) {
//       const response = error.response;
//       const data = response.data;

//       toast.error(data.message, {
//         position: "top-right",
//         autoClose: true,
//       });
//     }
//   };

//   return (
//     <div className="postPage">
//       <button className="button" onClick={() => navigate("newPost")}>
//         Add New Post
//       </button>
//       <h2 className="postTitle">Post List</h2>
//       <input
//         className="searchInput"
//         type="text"
//         name="search"
//         placeholder="Search here"
//         onChange={handleSearch}
//       />
//       <h3>Select page size for posts</h3>
//       <select
//         className="pageSizeSelect"
//         value={pageSize}
//         onChange={handleChange}
//       >
//         <option value={5}>5</option>
//         <option value={10}>10</option>
//         <option value={15}>15</option>
//         <option value={20}>20</option>
//       </select>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="postContainer">
//           {posts.map((post) => (
//             <div
//               key={post._id}
//               className="postCard"
//               onClick={() => navigate(`detailPost/${post._id}`)}
//             >
//               <h4 className="cardTitle">{post.title}</h4>
//               <p className="cardDescription">{post.description}</p>
//               <img
//                 className="cardImg"
//                 alt="mern"
//                 src={post.banner}
//                 style={{ width: "100px", height: "100px" }}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//       {pageCount.length > 0 && (
//         <div className="pageContainer">
//           <button
//             className="pageButton"
//             onClick={handlePrev}
//             disabled={currentPage === 1}
//           >
//             Prev
//           </button>
//           {pageCount.map((pageNumber, index) => (
//             <button
//               className="pageButton"
//               key={index}
//               onClick={() => handlePage(pageNumber)}
//               style={{
//                 backgroundColor: currentPage === pageNumber ? "#ccc" : "",
//               }}
//             >
//               {pageNumber}
//             </button>
//           ))}
//           <button
//             className="pageButton"
//             onClick={handleNext}
//             disabled={currentPage === totalPage}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostList;

//new code is:-
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import usePostList from "../../assets/extra/usePostList";

const PostList = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const stringfyBlogData = window.localStorage.getItem("blogData");
    const blogData = JSON.parse(stringfyBlogData);
    if (blogData?.user?.role) {
      setRole(blogData.user.role);
      console.log(blogData.user.role);
    }
  }, []);
  const navigate = useNavigate();
  const {
    posts,
    loading,
    pageCount,
    currentPage,
    pageSize,
    handlePrev,
    handleNext,
    handlePage,
    handleSearch,
    handlePageSizeChange,
  } = usePostList();

  return (
    <div className="postPage">
      {(role === 1 || role === 2) && (
        <button className="button" onClick={() => navigate("newPost")}>
          Add New Post
        </button>
      )}
      <input
        className="searchInput"
        type="text"
        name="search"
        placeholder="Search here"
        onChange={handleSearch}
      />
      <h3>Select page size for posts</h3>
      <select
        className="pageSizeSelect"
        value={pageSize}
        onChange={handlePageSizeChange}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
      <center>
        <h2 className="postTitle">Post List</h2>
      </center>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="postContainer">
          {posts.map((post) => (
            <div
              key={post._id}
              className="postCard"
              onClick={() => navigate(`detailPost/${post._id}`)}
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
      {pageCount.length > 0 && (
        <div className="pageContainer">
          <button
            className="pageButton"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {pageCount.map((pageNumber) => (
            <button
              className="pageButton"
              key={pageNumber}
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
            disabled={currentPage === pageCount.length}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;
