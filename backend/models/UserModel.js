const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [25, "First name too large"],
    match: /^[a-zA-Z]+$/,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: [25, "First name too large"],
    match: /^[a-zA-Z]+$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Invalid Email",
    },
    trim: true,
    minlength: [3, "Email too small"],
    maxlength: [200, "Email too large"],
  },
  password: {
    type: String,
    required: true,
    select: false,
    // minlength: [8, "Password too small"],  password validation should not be in scghema level it should be handled on api level
    // maxlength: [15, "Password too large"],
    // validate: {
    //   validator: function (value) {
    //     return validator.isStrongPassword(value);
    //   },
    //   message: "Please Enter a Strong Password",
    // },
  },
},
{timestamps:true}
);



userSchema.methods.getJWT = function(){
  const token = jwt.sign({_id:this._id,email:this.email}, process.env.JWTSECRET, {expiresIn:"1d"})
  return token
}

userSchema.methods.verifyPassword = async function(password){
  const isValidPassword = await bcrypt.compare(password, this.password);
  return isValidPassword;
}

const User = mongoose.model("User", userSchema);
module.exports = User;