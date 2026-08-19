const Job = require("../models/JobModel");
const searchLiveJobs = require("../services/jobService");

// const createJob = async (req, res) => {
//   try {
//     const {
//       title,
//       company,
//       location,
//       jobType,
//       workMode,
//       status,
//       salary,
//       applicationDate,
//       jobLink,
//       notes,
//     } = req.body;
//     const job = new Job({
//       title,
//       company,
//       location,
//       jobType,
//       workMode,
//       status,
//       salary,
//       applicationDate,
//       jobLink,
//       notes,
//       createdBy: req.user._id,
//     });

//     await job.save();

//     res.status(201).json({
//       message: "Job created successfully!",
//       job: job,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: err.message,
//       success: false,
//     });
//   }
// };

// const getAllJobs = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const jobs = await Job.find({ createdBy: userId });
//     return res.status(200).json({
//       success: true,
//       totalJobsApplied: jobs.length,
//       jobs,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: err.message,
//       success: false,
//     });
//   }
// };

const getLiveJobs = async (req,res) =>{
  try{
    const {
      keyword = "",
      location = "",
      page = 1,
    } = req.query;

    if (!keyword && !location) {
      return res.status(400).json({
        success: false,
        message: "Please provide a keyword or location",
      });
    }

    const jobs = await searchLiveJobs({
      keyword,
      location,
      page,
    });

    return res.status(200).json({
      success: true,
      jobs,
    });


  }catch(err){
    console.log(err.message)
    return res.status(500).json({
      success:false,
      message:err.message
    })
  }
}

// const getOneJob = async (req, res) => {
//   try {
//     const user = req.user._id;
//     const {jobid} = req.params;
//     const job = await Job.findOne({createdBy: user, _id: jobid});

//     if (!job) {
//       return res.status(404).json({
//         message: "Job not found",
//         success: false,
//       });
//     }


//     return res.status(201).json({
//         message:"Job fetched Successfully",
//         success:true,
//         job
//     })
//   } catch (err) {
//     return res.status(500).json({
//       message: err.message,
//       success: false,
//     });
//   }
// };

// const updateJob = async (req, res) => {
//  try{
//     const user = req.user._id;
//     const {jobid} = req.params;
//     const job = await Job.findOne({createdBy: user, _id:jobid});
//     if(!job){
//         return res.status(404).json({
//             message:"job not found",
//             success:false
//         })
//     }
//     const updatedJob = await Job.findByIdAndUpdate(
//         job._id,
//         {$set:req.body},
//         {new: true, runValidators:true}
//     )

//     return res.status(200).json({
//         message:"Job Updated successfully",
//         success:true,
//         updatedJob
//     })

//  }catch(err){
//     return res.status(500).json({
//         message:err.message,
//         success:false
//     })
//  }
// };

// const deleteJob = async (req, res) => {
//   try{
//     const user = req.user._id;
//     const{jobid} = req.params;
//     const job = await Job.findOne({createdBy: user, _id:jobid})

//     if(!job){
//         return res.status(404).json({
//             message:"Job not found",
//             success:false
//         })
//     }
//     await Job.findByIdAndDelete(job._id);

//     return res.status(200).json({
//         message:"Job deleted Successfully",
//         success:true
//     })

//   }catch(err){
//     return res.status(500).json({
//         message:err.message,
//         success:false
//     })
//   }
// };

module.exports = { getLiveJobs };
