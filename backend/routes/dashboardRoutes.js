const express = require("express");
const dashboardRoutes = express.Router();

const { getDashboard } = require("../controllers/dashboardController");
const authMiddleware = require("../middlewares/authMiddle");

dashboardRoutes.get("/", authMiddleware, getDashboard);

module.exports = dashboardRoutes;