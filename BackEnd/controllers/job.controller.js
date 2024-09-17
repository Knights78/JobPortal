import { Job } from "../models/job.model.js";
export const postJob=async(req,res)=>{
    try {
        const{title,description, requirements,salary,location,jobType,experience,position,companyId}=req.body
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,//for which particular company it is i.e(the job)
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error)
    }
}
export const getAllJobs=async(req,res)=>{
    try {
        //we have to do here the search filter
        const keyword=req.query.keyword || ""
        const query={
            $or:[
                {title:{$regex:keyword,$options:"i"}},//find the keyword which is been given by the user and options="i" means irrespective of case sensistive
                {description:{$regex:keyword,$options:"i"}}
            ]
        }
        const jobs=await Job.find(query).populate({
            path:"company"

        }).sort({createdAt:-1})
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        //console.log("All job",jobs)
        return res.status(200).json({
            jobs,
            success: true,
            message:"succesfully got all jobs"
        })
    } catch (error) {
        console.log(error)
    }
}
//this api is for the user
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        //console.log(jobId)
        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        //console.log(job)
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}

//admin can see all the jobs which he has posted
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;//this is the id of the particular user
        const jobs = await Job.find({ created_by: adminId })
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// export const deleteCompanyJob=async(req,res)=>{
//     try {
//         const jobId=req.params.id
//         const job=await Job.findByIdAndDelete(jobId)
//         if(!job)
//         {
//             return res.json({
//                 message:"error in removing the removing the job",
//                 success:false
//             })
//         }
//         return res.json({
//             message:"Job deleted succesfully",
//             success:true
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }
