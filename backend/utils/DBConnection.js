require("dotenv").config();
const mongoose = require("mongoose")

const connectDB =async function(){
    try{
    await mongoose.connect(process.env.CONNECTIONSTRING);
    }catch(err){
        console.log("Error happened : "+ err.message);
    }
    

}
module.exports = {connectDB};