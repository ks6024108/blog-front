const isEmail = (email) => {
  String(email)
    .toLowerCase()
    .match(/^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
};

const signupValidator = ({ name, email, password, confirmPassword }) => {
  const errors = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  if (!name) {
    errors.name = "Name is Required";
  }

  if (!email) {
    errors.email = "Email is Required";
  } else if (isEmail(email)) {
    errors.email = "Invalid Email";
  }

  if (!password) {
    errors.password = "Password is Required";
  } else if (password.length < 6) {
    errors.password = "Password must 6 char long";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Password doesn't Match";
  }
  return errors
};


export default signupValidator