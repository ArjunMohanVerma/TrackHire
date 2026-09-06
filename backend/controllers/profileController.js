const User = require("../models/UserModel");

//Get Profile
const getProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error("Error getting profile:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error Fetching profile at the moment",
    });
  }
};

//Update Profile
const updateProfile = async (req, res) => {
  try {
    const allowedFields = [ "firstName", "lastName", "profileImage", "phone", "headline", "bio", "location", "currentRole", "currentCompany", "experience", "skills", "preferredRoles", "preferredLocations", "workMode", "employmentType", "expectedSalary", "noticePeriod", "education", "linkedin", "github", "portfolio", ];

    const updates = {};
    allowedFields.forEach((field)=>{
      if(req.body[field]!== undefined){
        updates[field]=req.body[field];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(req.user._id, { $set: updates }, 
      { new: true,
        runValidators: true,
       });
       if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
       }
       return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: updatedUser,
       });

  } catch (error) {
    console.error("Update Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

module.exports = {
    getProfile,
    updateProfile,
}
