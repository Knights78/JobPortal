import { Job } from "../models/job.model.js";
import {Application} from "../models/application.model.js"

export const applyJob=async(req,res)=>{
    try {
        const userId=req.id;
        const jobId=req.params.id;//from header we will get the jobid
        if(!jobId)
        {
            return res.json({
                message:"Job Id is required to apply",
                success:false
            })
        }
        //check if such job exists
        const job=await Job.findById(jobId)
        if(!job)
        {
            return res.json({
                message:"Job is not found",
                success:false
            })
        }
           // check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        });

        job.application.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully.",
            success:true
        })



    } catch (error) {
        console.log(error)
    }
}

export const getappliedJobs=async(req,res)=>{
    try {
        const userId=req.id;
        const application=await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
           populate:{
            path:'company',
            options:{sort:{createdAt:-1}}
           }

        })
        //y;; get all the application which is been applied by this particular userId
        if(!application)
        {
            return res.json({
                message:"No application found",
                success:false
            })
        }
        return res.json({
            application,
            success:true

        })

    } catch (error) {
        console.log(error);
    }
}
//this is the api to get how many applicants have applied for the particular job the above api is for the user which has applied for jobs

export const getApplicants=async(req,res)=>{
    try {
        const jobId=req.params.id
        const applicants=await Job.find({_id:jobId}).populate({
            path:'application',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
            
        }) // we will get the applicants who have applied for this job

        if(!applicants)
        {
            return res.json({
                message:"Job not found",
                success:false
            })
        }
        return res.json({
            applicants,
            success:true
        })

       

    } catch (error) {
        console.log(error)
    }
}
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        // find the application by applicantion id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}