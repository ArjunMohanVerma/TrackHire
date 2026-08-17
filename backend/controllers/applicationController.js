const Application = require("../models/ApplicationModel");
const Job = require("../models/JobModel");
const isValidObjectId = require("../utils/validateObjectId");

const createApplication = async (req, res) => {
  try {
    const {
      job,
      status,
      appliedAt,
      priority,
      notes,
      interviewDate,
      followUpDate,
    } = req.body;

    if (!job) {
      return res.status(400).json({ message: "Job information is required" });
    }
    if (!job.externalId) {
      return res.status(400).json({ message: "Job externalId is required" });
    }
    if (!job.source) {
      return res.status(400).json({ message: "Job source is required" });
    }

    let savedJob = await Job.findOne({
      externalId: job.externalId,
      source: job.source,
    });

    if (!savedJob) {
      savedJob = await Job.create({
        externalId: job.externalId,
        source: job.source,
        title: job.title,
        company: job.company,
        location: job.location,
        jobType: job.jobType,
        workMode: job.workMode,
        salary: job.salary,
        jobLink: job.jobLink,
        description: job.description,
        postedAt: job.postedAt,
      });
    }

    const existingApplication = await Application.findOne({
      user: req.user._id,
      job: savedJob._id,
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "Application already exists for this job" });
    }

    const application = await Application.create({
      user: req.user._id,
      job: savedJob._id,
      status,
      appliedAt,
      priority,
      notes,
      interviewDate,
      followUpDate,
    });

    const populatedApplication = await Application.findById(
      application._id,
    ).populate("job");

    return res.status(201).json({
      message: "Application created successfully",
      application: populatedApplication,
    });
  } catch (err) {
    // console.error("Error creating application:", err.message);
    return res
      .status(500)
      .json({ message: "Server Error"});
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user._id,
    })
      .populate("job")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Applications fetched successfully",
      count: applications.length,
      applications,
    });
  } catch (err) {
    // console.error("Error fetching applications:", err.message);
    return res
      .status(500)
      .json({ message: "Server Error"});
  }
};

const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid Application ID",
      });
    }

    const application = await Application.findOne({
      _id: id,
      user: req.user._id,
    }).populate("job");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    return res
      .status(200)
      .json({ message: "Application fetched successfully", application });
  } catch (err) {
    // console.error("Error fetching applications:", err.message);
    return res
      .status(500)
      .json({ message: "Server Error"});
  }
};

const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, appliedAt, priority, notes, interviewDate, followUpDate } =
      req.body;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid application ID",
      });
    }

    const application = await Application.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }
    if (status !== undefined) {
      application.status = status;
    }

    if (appliedAt !== undefined) {
      application.appliedAt = appliedAt;
    }

    if (priority !== undefined) {
      application.priority = priority;
    }

    if (notes !== undefined) {
      application.notes = notes;
    }

    if (interviewDate !== undefined) {
      application.interviewDate = interviewDate;
    }

    if (followUpDate !== undefined) {
      application.followUpDate = followUpDate;
    }

    // 3. Save changes
    await application.save();

    const populatedApplication = await Application.findById(
      application._id,
    ).populate("job");

    return res.status(200).json({
      message: "Application updated successfully",
      application: populatedApplication,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error"});
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid application ID",
      });
    }

    const application = await Application.findOne({
      _id: id,
      user: req.user._id,
    });

    // 2. Application doesn't exist or doesn't belong to user
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    // 3. Delete application
    await Application.deleteOne({
      _id: id,
      user: req.user._id,
    });

    return res.status(200).json({
      message: "Application deleted successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error"});
  }
};

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
