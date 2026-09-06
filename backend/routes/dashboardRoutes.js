const express = require("express");

const dashboardRoutes = express.Router();

dashboardRoutes.get("/",(req,res)=>{
    console.log("Dashboard Route Called");
    return res.status(200).json({
        message:"Dashboard route called",
        success:true,
    })

})

module.exports = dashboardRoutes;