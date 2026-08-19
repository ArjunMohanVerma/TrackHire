const express = require("express");
const {getLiveJobs} = require("../controllers/jobController");
const jobRoutes = express.Router();

// jobRoutes.post("/createjob",auth, createJob);
// jobRoutes.get("/getalljobs",auth, getAllJobs);
jobRoutes.get("/getlivejobs", getLiveJobs);
// jobRoutes.get("/getonejob/:jobid",auth, getOneJob);
// jobRoutes.patch("/update/:jobid",auth, updateJob);
// jobRoutes.delete("/delete/:jobid",auth, deleteJob);

module.exports = jobRoutes;