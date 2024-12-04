import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";

const useCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  // Fetch categories
  const fetchCategories = async (
    page = currentPage,
    size = pageSize,
    query = searchValue
  ) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/category?page=${page}&size=${size}&q=${query}`
      );
      const data = response.data.data;
      setCategories(data.categories);
      setTotalPage(data.pages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Error fetching categories");
    }
  };

  // Delete a category
  const deleteCategory = async () => {
    try {
      const response = await axios.delete(`/category/${categoryId}`);
      setPopupVisible(false);
      toast.success(response.data.message);
      fetchCategories(); // Refresh the category list
    } catch (error) {
      setPopupVisible(false);
      toast.error(error.response?.data?.message || "Error deleting category");
    }
  };

  // Pagination helpers
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPage));
  const handlePage = (pageNumber) => setCurrentPage(pageNumber);

  // Effects to fetch categories when page, size, or search changes
  useEffect(() => {
    fetchCategories();
  }, [currentPage, pageSize, searchValue]);

  return {
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
  };
};

export default useCategoryList;
