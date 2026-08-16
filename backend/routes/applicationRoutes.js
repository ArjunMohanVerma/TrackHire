const express = require("express");
const auth = require("../middlewares/authMiddle");

const { createApplication, getApplications, getApplicationById,updateApplication, deleteApplication } = require("../controllers/applicationController");


const applicationRoutes = express.Router();

applicationRoutes.post("/createapplication",auth, createApplication);
applicationRoutes.get("/getapplications",auth, getApplications);
applicationRoutes.get("/getapplicationbyid/:id",auth, getApplicationById);
applicationRoutes.patch("/updateapplication/:id",auth, updateApplication);
applicationRoutes.delete("/deleteapplication/:id",auth, deleteApplication);
module.exports = applicationRoutes;