const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = {
  validateLoginInput: (data) => {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required.";
    } else if (!Validator.isEmail(data.email)) {
      errors.email = "Email field is invalid.";
    }

    if (Validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    }

    return {
      errors,
      isValid: isEmpty(errors),
    };
  },
};
