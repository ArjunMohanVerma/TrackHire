const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const {
  validateSignUpData,
  validateLoginData,
} = require("../utils/validation");

const signup = async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const alreadyexist = await User.findOne({ email });

    if (alreadyexist) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = user.getJWT();
    res.cookie("Token", token);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.log(error.message);

    // Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);

      return res.status(400).json({
        success: false,
        errors,
      });
    }

    // Duplicate email
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Internal server error
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    validateLoginData(req);
    const { email, password } = req.body;
    // check if the user exists with the given mail
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        msg: "Invalid Credentials",
        Success: "False",
      });
    }
    const isPasswordCorrect =await user.verifyPassword(password);
    if (isPasswordCorrect) {
      const token = user.getJWT();
      res.cookie("Token", token);
      res.status(200).json({
        message: "Login Successfull",
        user: user,
      });
    }else{
        throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(500).json({
        message:err.message,
        success:false
    })
  }
};

const logout = async(req,res)=>{
    // #just delete the cookie and token thats it
    res.cookie("Token", null,{
        expires: new Date(Date.now())
    });
    res.status(200).json({message:"Logout Successfull"})
}

const forgotPassword = async(req,res) =>{
    try{
        const {email} = req.body

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({message: "User does not exists"});
        }

        const {password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        user.password=hashedPassword;
        await user.save();
        res.status(200).json({
            message:"Password updated successfully",
            success: true
        })
   }catch(err){
        res.status(500).json({error : err.message,
            success: false
        });
    }
}

module.exports = {
  signup,
  login,
  logout,
  forgotPassword
};
