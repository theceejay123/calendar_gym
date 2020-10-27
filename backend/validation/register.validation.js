const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = {
  validateRegisterInput: (data) => {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator
    data.name = !isEmpty(data.name) ? data.name : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.email = !isEmpty(data.email) ? data.email : "";

    if (Validator.isEmpty(data.name)) {
      errors.name = "Name field is required.";
    }

    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required.";
    } else if (!Validator.isEmail(data.email)) {
      errors.email = "Email field is invalid.";
    }

    if (Validator.isEmpty(data.password)) {
      errors.password = "Password field is required.";
    }

    if (Validator.isEmpty(data.password_copy)) {
      errors.password_copy = "Confirm password field is required.";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!Validator.equals(data.password, data.password_copy)) {
      errors.password_copy = "Passwords must match";
    }

    return {
      errors,
      isValid: isEmpty(errors),
    };
  },
};
