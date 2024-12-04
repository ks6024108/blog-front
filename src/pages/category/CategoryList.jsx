// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axios from "../../utils/axiosInstance";
// import { useNavigate } from "react-router-dom";
// import moment from "moment";
// import "../../assets/css/popup.css";

// const CategoryList = () => {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [totalPage, setTotalPage] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageCount, setPageCount] = useState([]);

//   const [pageSize, setPageSize] = useState(5);
//   const [searchValue, setSearchValue] = useState("");

//   const [isPopupVisible, setPopupVisible] = useState(false);
//   const [categoryId, setCategoryId] = useState(null);

//   useEffect(() => {
//     const getCategories = async () => {
//       try {
//         setLoading(true);

//         //api
//         const response = await axios.get(
//           `/category?page=${currentPage}&size=${pageSize}&q=${searchValue}`
//         );
//         const data = response.data.data;
//         setCategories(data.categories);

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
//     getCategories();
//   }, [currentPage, pageSize]); //searchValue, pageSize, categories

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

//       const response = await axios.get(
//         `/category?q=${input}&page=${currentPage}`
//       );
//       const data = response.data.data;
//       setCategories(data.categories);
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

//   const handleDelete = async () => {
//     try {
//       const response = await axios.delete(`/category/${categoryId}`);
//       setPopupVisible(false);

//       const data = response.data;

//       toast.success(data.message, {
//         position: "top-right",
//         autoClose: true,
//       });

//       //check if load or not written start
//       const response2 = await axios.get(
//         `/category?q=${searchValue}&page=${currentPage}`
//       );
//       const data2 = response2.data.data;
//       setCategories(data2.categories);
//       setTotalPage(data2.pages);
//       //check if load or not written end
//     } catch (error) {
//       setPopupVisible(false);

//       const response = error.response;
//       const data = response.data;

//       toast.error(data.message, {
//         position: "top-right",
//         autoClose: true,
//       });
//     }
//   };
//   return (
//     // <div>
//     //   <button className="button" onClick={() => navigate("newCategory")}>
//     //     Add Category
//     //   </button>
//     //   <h2 className="categoryTableTitle">Category List</h2>
//     //   <input
//     //     className="searchInput"
//     //     type="text"
//     //     name="search"
//     //     placeholder="search here"
//     //     onChange={handleSearch}
//     //   />
//     //   <h3>select page size for categories</h3>
//     //   <select value={pageSize} onChange={handleChange}>
//     //     <option value={5}>5</option>
//     //     <option value={10}>10</option>
//     //     <option value={15}>15</option>
//     //     <option value={20}>20</option>
//     //   </select>
//     //   {loading ? (
//     //     <p>Loading...</p>
//     //   ) : (
//     //     <table>
//     //       <thead>
//     //         <tr>
//     //           <th>Title</th>
//     //           <th>Description</th>
//     //           <th>Created At</th>
//     //           <th>Updated At</th>
//     //           <th>Action</th>
//     //         </tr>
//     //       </thead>
//     //       <tbody>
//     //         {categories.map((category) => (
//     //           <tr key={category._id}>
//     //             <td>{category.title}</td>
//     //             <td>{category.desc}</td>
//     //             <td>
//     //               {moment(category.createdAt).format("YYYY-MM-DD HH:mm:ss")}
//     //             </td>
//     //             <td>
//     //               {" "}
//     //               {moment(category.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
//     //             </td>
//     //             <th>
//     //               <button
//     //                 className="button"
//     //                 onClick={() => navigate(`updateCategory/${category._id}`)}
//     //               >
//     //                 Update
//     //               </button>
//     //               <button className="button">Delete</button>
//     //             </th>
//     //           </tr>
//     //         ))}
//     //       </tbody>
//     //     </table>
//     //   )}
//     //   {pageCount.length > 0 && (
//     //     <div className="pageContainer">
//     //       <button
//     //         className="pageButton"
//     //         onClick={handlePrev}
//     //         disabled={currentPage === 1}
//     //       >
//     //         Prev
//     //       </button>
//     //       {pageCount.map((pageNumber, index) => (
//     //         <button
//     //           className="pageButton"
//     //           key={index}
//     //           onClick={() => handlePage(pageNumber)}
//     //           style={{
//     //             backgroundColor: currentPage === pageNumber ? "#ccc" : "",
//     //           }}
//     //         >
//     //           {pageNumber}
//     //         </button>
//     //       ))}
//     //       <button
//     //         className="pageButton"
//     //         onClick={handleNext}
//     //         disabled={currentPage === totalPage}
//     //       >
//     //         Next
//     //       </button>
//     //     </div>
//     //   )}
//     // </div>
//     <div className="categoryListContainer">
//       <button className="button" onClick={() => navigate("newCategory")}>
//         Add Category
//       </button>
//       <h2 className="categoryTableTitle">Category List</h2>
//       <input
//         className="searchInput"
//         type="text"
//         name="search"
//         placeholder="Search here"
//         onChange={handleSearch}
//       />
//       <h3>Select page size for categories</h3>
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
//         <div className="tableWrapper">
//           <table className="responsiveTable">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Description</th>
//                 <th className="notDisplay">Created At</th>
//                 <th className="notDisplay">Updated At</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {categories.map((category) => (
//                 <tr key={category._id}>
//                   <td>{category.title}</td>
//                   <td>{category.desc}</td>
//                   <td className="notDisplay">
//                     {moment(category.createdAt).format("YYYY-MM-DD HH:mm:ss")}
//                   </td>
//                   <td className="notDisplay">
//                     {moment(category.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
//                   </td>
//                   <td>
//                     <button
//                       className="button"
//                       onClick={() => navigate(`updateCategory/${category._id}`)}
//                     >
//                       Update
//                     </button>
//                     <button
//                       className="button deleteButton"
//                       onClick={() => {
//                         setPopupVisible(true);
//                         setCategoryId(category._id);
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
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

//       {/* pop up and deleting here... */}
//       <div className="popupContainer">
//         {isPopupVisible && (
//           <div className="popupOverlay">
//             <div className="popupBox">
//               {/* Close Button */}
//               <button
//                 onClick={() => setPopupVisible(false)}
//                 className="closeButton"
//               >
//                 &times;
//               </button>

//               {/* Popup Content */}
//               <h2>Confirm Delete</h2>
//               <p>Are you sure you want to delete this category?</p>

//               {/* Action Buttons */}
//               <div className="popupActions">
//                 <button
//                   onClick={() => setPopupVisible(false)}
//                   className="actionButton cancel"
//                 >
//                   No
//                 </button>
//                 <button onClick={handleDelete} className="actionButton confirm">
//                   Yes
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryList;

//new code is:__---
import { useNavigate } from "react-router-dom";
import moment from "moment";
import useCategoryList from "../../assets/extra/useCategoryList";

const CategoryList = () => {
  const navigate = useNavigate();
  const {
    categories,
    loading,
    totalPage,
    currentPage,
    pageSize,
    searchValue,
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

  return (
    <div className="categoryListContainer">
      <button className="button" onClick={() => navigate("newCategory")}>
        Add Category
      </button>
      <h2 className="categoryTableTitle">Category List</h2>
      <input
        className="searchInput"
        type="text"
        value={searchValue}
        placeholder="Search here"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <h3>Select page size for categories</h3>
      <select
        className="pageSizeSelect"
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
      >
        {[5, 10, 15, 20].map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      {loading ? (
        <p className="loading">Loading...</p>
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
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.title}</td>
                  <td>{category.desc}</td>
                  <td className="hidesc">
                    {moment(category.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                  </td>
                  <td className="hidesc">
                    {moment(category.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
                  </td>
                  <td>
                    <button
                      className="button updateButton catButton"
                      onClick={() => navigate(`updateCategory/${category._id}`)}
                    >
                      Update
                    </button>
                    <button
                      className="button deleteButton catButton"
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
      <div className="pageContainer">
        <button
          className="pageButton"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className="pageButton"
            onClick={() => handlePage(page)}
            style={{ backgroundColor: currentPage === page ? "#ccc" : "" }}
          >
            {page}
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
      {isPopupVisible && (
        <div className="popupContainer">
          <div className="popupOverlay">
            <div className="popupBox">
              <button
                onClick={() => setPopupVisible(false)}
                className="closeButton"
              >
                &times;
              </button>
              <h2>Confirm Delete</h2>
              <p>Are you sure you want to delete this category?</p>
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
        </div>
      )}
    </div>
  );
};

export default CategoryList;
