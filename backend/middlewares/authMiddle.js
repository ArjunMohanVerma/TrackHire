const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const auth = async (req, res, next) =>{
    try{
        const token = req.cookies.Token;
        if(!token){
            return res.status(401).json({message: "Please Login First!"});
        }

        const decode = jwt.verify(token,process.env.JWTSECRET);

        const user = await User.findById(decode._id);
        req.user = user;
        next();




    }catch(err){
        res.status(401).json({
            Message:"Invalid Token",
            success:false
        })
    }
}

module.exports = auth;