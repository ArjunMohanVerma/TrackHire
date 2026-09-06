const express = require("express");
const dotenv = require("dotenv");
const cookieparser = require("cookie-parser")
const mongoose = require("mongoose");
const cors = require("cors");

//importing all required routes
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

//importing database connections
const {connectDB} = require("./utils/DBConnection");

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use("/auth", authRoutes);
app.use("/job", jobRoutes);
app.use("/application", applicationRoutes);
app.use("/dashboard", dashboardRoutes)

connectDB()
  .then(() => {
     console.log("Connection State:", mongoose.connection.readyState);
    app.listen(PORT, () => {
      console.log("Server is running on port:" + PORT);
    });
  })
  .catch((err) => {
    console.log("Error Occured : " + err.message);
  });
