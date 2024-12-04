import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";

const usePostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [searchValue, setSearchValue] = useState("");

  // Fetch posts
  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/blog?page=${currentPage}&size=${pageSize}&q=${searchValue}`
        );
        const data = response.data.data;
        setPosts(data.blogs);
        setTotalPage(data.pages);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        const response = error.response;
        const data = response?.data;
        toast.error(data?.message || "Failed to fetch posts", {
          position: "top-right",
          autoClose: true,
        });
      }
    };
    getPosts();
  }, [currentPage, pageSize, searchValue]);

  // Update page count
  useEffect(() => {
    if (totalPage > 1) {
      const tempPageCount = Array.from({ length: totalPage }, (_, i) => i + 1);
      setPageCount(tempPageCount);
    } else {
      setPageCount([]);
    }
  }, [totalPage]);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPage));
  };

  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = async (e) => {
    const input = e.target.value;
    setSearchValue(input);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  return {
    posts,
    loading,
    totalPage,
    currentPage,
    pageCount,
    pageSize,
    searchValue,
    handlePrev,
    handleNext,
    handlePage,
    handleSearch,
    handlePageSizeChange,
  };
};

export default usePostList;
