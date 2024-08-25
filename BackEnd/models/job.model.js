import mongoose from "mongoose";
//this schema will be used by the employeer who will post the job
const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:[{
        type: String
    }],
    salary:{//what is the salary of that particular job
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true  
    },
    experienceLevel:{
        type:Number,
        required:true
    },
    position:{//what are the number of position for that particular job
        type:Number,
        required:true
    },
   
    company:{
        type:mongoose.Schema.Types.ObjectId,//company should be registered then from that particular comoany job will be there that is Why ref company is given
        ref:'Company',
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,//created by have a type of id from the user which have registered himself as the employyer that is why for particular user id will be tgere
        ref:'User',
        required:true
    },
    application:[//this will store the id of the all the applications which have applied for this job which have been posted
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Application'
        },
    ]
},{timestamps:true})
export const Job=mongoose.model('Job',jobSchema);