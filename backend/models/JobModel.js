const mongoose = require("mongoose");
 const validator = require("validator");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: [100, "This name is not valid"],
      minlength: [1, "Title cannot be empty"],
      trim: true,
    },
    company: {
      type: String,
      required: true,
      maxlength: [100, "This name is not valid"],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
    jobType: {
      type: String,
      enum: ["Full Time", "Part Time", "Internship", "Contract", "Freelance"],
      default: "Full Time",
    },
    workMode: {
      type: String,
      enum: ["Remote", "Hybrid", "Onsite"],
      default: "Onsite",
    },
    status: {
      type: String,
      enum: ["Wishlist", "Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
    },
    salary: {
      type: Number,
      min: [0, "Salary can not be negative"],
    },
    applicationDate: {
      type: Date,
      default: Date.now,
    },

    jobLink: {
      type: String,
      trim: true,
      default:"",
       validate: {
       validator: function(value) {
        return !value || validator.isURL(value);
      },
      message: "Invalid Job URL",
    },
    },

    notes: {
      type: String,
      maxlength: [1000, "Notes too long"],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
