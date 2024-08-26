import mongoose from "mongoose";
const applicationSchema=new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,//for a particular job id will be stored here like frontend developer,backend
        ref:'Job',
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum: ['pending', 'accepted', 'rejected'],
        default:'pending'
    }
},{timestamps:true})
export const Application=mongoose.model('Application',applicationSchema)
//for a particular job and particular user has applied and in JOb model in an array all the applications will be stored based on the application
