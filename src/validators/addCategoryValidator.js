const addCategoryValidator = ({ title }) => {
  const errors = {
    title: "",
  };

  if (!title) {
    errors.title = "Title is Required";
  }

  return errors;
};

export default addCategoryValidator;
