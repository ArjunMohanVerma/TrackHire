const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateSignUpData = (res) => {
  const { firstName, lastName, email, password } = res.body;

  if (!firstName || ! lastName) {
    throw new Error("Enter a name");
  } else if (firstName.length > 25 || firstName.length < 3) {
    throw new Error("First name must be 3-25 characters");
  } else if (!validator.isEmail(email)) {
    throw new Error("Enter a valid email");
  } else if (password.length < 8 || password.length > 15) {
    throw new Error("Enter a valid length password");
  }
};

const validateLoginData = (res) => {
  const { email, password } = res.body;

  if (!validator.isEmail(email)) {
    throw new Error("Enter a valid email");
  } else if (password.length < 8 || password.length > 15) {
    throw new Error("Enter a valid length password");
  }
};


module.exports = { validateSignUpData, validateLoginData };
