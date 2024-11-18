const isEmail = (email) => {
  String(email)
    .toLowerCase()
    .match(/^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
};

const LoginValidator = ({ email, password }) => {
  const errors = {
    email: "",
    password: "",
  };

  if (!email) {
    errors.email = "Email is Required";
  } else if (isEmail(email)) {
    errors.email = "Invalid Email";
  }

  if (!password) {
    errors.password = "Password is Required";
  } 

  return errors;
};

export default LoginValidator;
