const express = require("express")
const {signup, login, logout, forgotPassword} = require("../controllers/authControllers")


const authRoutes =  express.Router()

authRoutes.post("/signup", signup );
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.patch("/forgot", forgotPassword)

module.exports = authRoutes