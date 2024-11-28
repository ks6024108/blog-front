const isEmail = (email) => {
  String(email)
    .toLowerCase()
    .match(/^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
};

const profileValidator = ({ name, email }) => {
  const errors = {
    name: "",
    email: "",
  };

  if (!name) {
    errors.name = "Name is Required";
  }

  if (!email) {
    errors.email = "Email is Required";
  } else if (isEmail(email)) {
    errors.email = "Invalid Email";
  }

  return errors;
};

export default profileValidator;
