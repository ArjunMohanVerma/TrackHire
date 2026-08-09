const express = require("express")
const {signup, login, logout, getCurrentUser, forgotPassword} = require("../controllers/authControllers")
const auth = require("../middlewares/authMiddle")


const authRoutes =  express.Router()

authRoutes.post("/signup", signup );
authRoutes.post("/login", login);
authRoutes.get("/me", auth, getCurrentUser);
authRoutes.post("/logout", logout);
authRoutes.patch("/forgot", forgotPassword)

module.exports = authRoutes