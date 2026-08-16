const mongoose = require("mongoose");
const validator = require("validator");

const jobSchema = new mongoose.Schema(
  {
    externalId: {
      type: String,
      required: true,
      trim: true,
    },

    source: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
      minlength: [1, "Title cannot be empty"],
      trim: true,
    },

    company: {
      type: String,
      required: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
      trim: true,
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    jobType: {
      type: String,
      enum: [
        "Full Time",
        "Part Time",
        "Internship",
        "Contract",
        "Freelance",
      ],
      default: "Full Time",
    },

    workMode: {
      type: String,
      enum: ["Remote", "Hybrid", "Onsite"],
      default: "Onsite",
    },

    salary: {
      type: Number,
      min: [0, "Salary cannot be negative"],
      default: null,
    },

    jobLink: {
      type: String,
      trim: true,
      default: "",
      validate: {
        validator: function (value) {
          return !value || validator.isURL(value);
        },
        message: "Invalid Job URL",
      },
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    postedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Same external job should not be stored twice
jobSchema.index(
  { source: 1, externalId: 1 },
  { unique: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;