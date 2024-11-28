const profileValidator = ({ oldPassword, newPassword }) => {
  const errors = {
    oldPassword: "",
    newPassword: "",
  };

  if (!oldPassword) {
    errors.oldPassword = "Old Password is Required";
  }

  if (!newPassword) {
    errors.newPassword = "New Password is Required";
  } else if (newPassword.length < 6) {
    errors.newPassword = "New Password should be 6 char long.";
  }

  if (oldPassword && oldPassword === newPassword) {
    errors.newPassword = "You are providing old password";
  }
  return errors;
};

export default profileValidator;
