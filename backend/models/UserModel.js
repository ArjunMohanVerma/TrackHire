const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  // firstName: {
  //   type: String,
  //   required: true,
  //   trim: true,
  //   maxlength: [25, "First name too large"],
  //   match: /^[a-zA-Z]+$/,
  // },
  // lastName: {
  //   type: String,
  //   trim: true,
  //   maxlength: [25, "First name too large"],
  //   match: /^[a-zA-Z]+$/,
  // },
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   lowercase: true,
  //   validate: {
  //     validator: function (value) {
  //       return validator.isEmail(value);
  //     },
  //     message: "Invalid Email",
  //   },
  //   trim: true,
  //   minlength: [3, "Email too small"],
  //   maxlength: [200, "Email too large"],
  // },
  // password: {
  //   type: String,
  //   required: true,
  //   select: false,
  //   // minlength: [8, "Password too small"],  password validation should not be in scghema level it should be handled on api level
  //   // maxlength: [15, "Password too large"],
  //   // validate: {
  //   //   validator: function (value) {
  //   //     return validator.isStrongPassword(value);
  //   //   },
  //   //   message: "Please Enter a Strong Password",
  //   // },
  // },
  

  
  firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [25, "First name too large"],
      match: /^[a-zA-Z]+$/,
    },
    //having account information only here
    lastName: {
      type: String,
      trim: true,
      maxlength: [25, "Last name too large"],
      match: /^[a-zA-Z]+$/,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Invalid Email",
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    // getting profile information
    profileImage: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    headline: {
      type: String,
      default: "",
      trim: true,
      maxlength: [120, "Headline too long"],
    },

    bio: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "Bio too long"],
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    // professional information getting from the user
    currentRole: {
      type: String,
      default: "",
      trim: true,
    },

    currentCompany: {
      type: String,
      default: "",
      trim: true,
    },

    experience: {
      type: Number,
      default: 0,
      min: 0,
    },

    skills: {
      type: [String],
      default: [],
    },
    //getting job preferences
     preferredRoles: {
      type: [String],
      default: [],
    },

    preferredLocations: {
      type: [String],
      default: [],
    },

    workMode: {
      type: [String],
      enum: ["Remote", "Hybrid", "On-site"],
      default: [],
    },

    employmentType: {
      type: [String],
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      default: [],
    },

    expectedSalary: {
      type: Number,
      default: null,
    },

    noticePeriod: {
      type: String,
      default: "",
    },
    // getting education details from the user
    education: [
      {
        degree: {
          type: String,
          trim: true,
        },

        institution: {
          type: String,
          trim: true,
        },

        fieldOfStudy: {
          type: String,
          trim: true,
        },

        startYear: Number,

        endYear: Number,
      },
    ],
    // SOCIAL / PROFESSIONAL LINKS
    // =========================
    linkedin: {
      type: String,
      default: "",
      trim: true,
    },

    github: {
      type: String,
      default: "",
      trim: true,
    },

    portfolio: {
      type: String,
      default: "",
      trim: true,
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