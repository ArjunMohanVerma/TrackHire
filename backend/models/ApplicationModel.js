const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true,
    },
    status:{
        type:String,
        enum:["Saved","Applied","Shortlisted","Rejected","Screening","Interview","Offer","Hired","Technical Round","HR Round","Withdrawn"],
        default:"Saved",
    },
    appliedAt:{
        type:Date,
    },
     priority:{
        type:String,
        enum:["Low","Medium","High"],
        default:"Medium",
    },
    notes:{
        type:String,
        maxlength:[2000, "Notes cannot exceed 2000 characters"],
        trim:true,
        default:"",
    },
    interviewDate:{
        type:Date,
    },
    followUpDate:{
        type:Date,
    },

},
{timestamps:true});

applicationSchema.index({ user: 1, status: 1 });
applicationSchema.index({ user: 1, createdAt: -1 });
applicationSchema.index({ user: 1, job: 1 }, { unique: true });

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;