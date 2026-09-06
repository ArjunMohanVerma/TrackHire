const express = require("express");
const auth = require("../middlewares/authMiddle");
const {
    getProfile,
    updateProfile,
} = require("../controllers/profileController");

const profileRoutes = express.Router();

profileRoutes.get("/", auth, getProfile);
profileRoutes.patch("/", auth, updateProfile);

module.exports = profileRoutes;