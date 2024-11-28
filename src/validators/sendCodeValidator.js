// const isEmail = (email) => {
//   String(email)
//     .toLowerCase()
//     .match(/^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
// };

const sendCodeValidator = ({ email }) => {
  const errors = {
    email: "",
  };

  if (!email) {
    errors.email = "Email is Required";
  }
  // else if (!isEmail(email)) {
  //   errors.email = "Invalid Email";
  // }

  return errors;
};

export default sendCodeValidator;
