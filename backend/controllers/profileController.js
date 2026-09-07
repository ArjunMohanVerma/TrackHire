const User = require("../models/UserModel");
const cloudinary = require("../config/cloudinary");


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
    const allowedFields = [
      "firstName",
      "lastName",
      "profileImage",
      "phone",
      "headline",
      "bio",
      "location",
      "currentRole",
      "currentCompany",
      "experience",
      "skills",
      "preferredRoles",
      "preferredLocations",
      "workMode",
      "employmentType",
      "expectedSalary",
      "noticePeriod",
      "education",
      "linkedin",
      "github",
      "portfolio",
    ];

    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true },
    );
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

const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "trackhire/profile-images",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      stream.end(req.file.buffer);
    });


    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set:{
          profileImage: result.secure_url,
        },
      },
      {
        new:true,
        runValidators:true,
      }
    );
    if(!updatedUser){
      return res.status(404).json({
        success:false,
        message:"User not found",
      });
    }
    return res.status(200).json({
      success:true,
      message:"Profile image uploaded successfully",
      imageUrl:result.secure_url,
      user:updatedUser,
    });



  } catch (error) {
    console.error("Upload Profile Image Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload profile image",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadProfileImage,
};
