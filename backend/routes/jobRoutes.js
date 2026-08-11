const express = require("express");
const {createJob, getAllJobs,getLiveJobs, getOneJob,updateJob,deleteJob} = require("../controllers/jobController");
const auth = require("../middlewares/authMiddle")
const jobRoutes = express.Router();

jobRoutes.post("/createjob",auth, createJob);
jobRoutes.get("/getalljobs",auth, getAllJobs);
jobRoutes.get("/getlivejobs", getLiveJobs);
jobRoutes.get("/getonejob/:jobid",auth, getOneJob);
jobRoutes.patch("/update/:jobid",auth, updateJob);
jobRoutes.delete("/delete/:jobid",auth, deleteJob);

module.exports = jobRoutes;