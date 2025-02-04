const validator = require("validator");

const authValidate = (email, password, name = null) => {
  if (name !== null && (name.length < 3 || name.length > 50)) {
    return false;
  } else if (!validator.isEmail(email)) {
    return false;
  } else if (password === "" || password.length < 6 || password.length > 25) {
    return false;
  }
  return true;
};

module.exports = authValidate;
