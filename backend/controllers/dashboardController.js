const Application = require("../models/ApplicationModel");
const User = require("../models/UserModel");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    //Basic Stats
    // const start = performance.now();
    const totalApplications = await Application.countDocuments({
      user: userId,
    });
    // const end = performance.now();
    // console.log(`Dashboard data fetched in ${end - start} ms`);
    const interviews = await Application.countDocuments({
      user: userId,
      status: {
        $in: ["Interview", "Technical Round", "HR Round"],
      },
    });
    const offers = await Application.countDocuments({
      user: userId,
      status: "Offer",
    });
    const rejected = await Application.countDocuments({
      user: userId,
      status: "Rejected",
    });

    //Application Pipeline Stats

    const pipelineData = await Application.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    const pipeline = {
      Saved: 0,
      Applied: 0,
      Shortlisted: 0,
      Rejected: 0,
      Screening: 0,
      Interview: 0,
      Offer: 0,
      Hired: 0,
      "Technical Round": 0,
      "HR Round": 0,
      Withdrawn: 0,
    };

    pipelineData.forEach((item) => {
      if (pipeline[item._id] != undefined) {
        pipeline[item._id] = item.count;
      }
    });

    //Recent Applications
    const recentApplications = await Application.find({ user: userId })
      .populate("job", "title company location")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    //upcoming Interviews
    const now = new Date();
    const upcomingInterviews = await Application.find({
      user: userId,
      interviesDate: {
        $gte: now,
      },
    })
      .populate("job", "title company location")
      .sort({ interviewDate: 1 })
      .limit(5)
      .lean();

    //upcoming Follow-ups
    const upcomingFollowUps = await Application.find({
      user: userId,
      followUpDate: {
        $gte: now,
      },
    })
      .populate("job", "title company location")
      .sort({ followUpDate: 1 })
      .limit(5)
      .lean();

    //Profile Completion
    const user = req.user;
    const profileFields = [
      user.firstName,
      user.lastName,
      user.profileImage,
      user.phone,
      user.headline,
      user.bio,
      user.location,
      user.currentRole,
      user.experience !== null && user.experience !== undefined,
      user.skills?.length > 0,
      user.preferredRoles?.length > 0,
      user.preferredLocations?.length > 0,
      user.workMode?.length > 0,
      user.employmentType?.length > 0,
      user.education?.length > 0,
      user.linkedin,
      user.github,
      user.portfolio,
    ];
    const completedFields = profileFields.filter(Boolean).length;
    const profileCompletion = (completedFields / profileFields.length) * 100;
    Math.round((completedFields / profileFields.length) * 100);

    return res.status(200).json({
      success: true,
      dashboard: {
        stats: {
          totalApplications,
          interviews,
          offers,
          rejected,
        },
        pipeline,
        recentApplications,
        upcomingInterviews,
        upcomingFollowUps,
        profileCompletion,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getDashboard,
};
