const express = require("express");
const auth = require("../middlewares/authMiddle");
const upload = require("../middlewares/uploads");

const {
    getProfile,
    updateProfile,
    uploadProfileImage,
} = require("../controllers/profileController");

const profileRoutes = express.Router();

profileRoutes.get("/", auth, getProfile);
profileRoutes.patch("/", auth, updateProfile);
profileRoutes.post("/image", auth, upload.single("profileImage"), uploadProfileImage);


module.exports = profileRoutes;