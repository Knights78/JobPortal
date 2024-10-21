import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from "axios";
import { toast } from 'sonner';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch } from 'react-redux';
import { JOB_API_END_POINT } from '@/utils/constant';
const JobDescription = () => {
    const singleJob = useSelector(store => store.job.singleJob);
    const { user } = useSelector(store => store.auth);
    const params = useParams();
    const jobId = params.id;
    //console.log(jobId)
    const isInitiallyApplied = singleJob?.application?.some(application => 
        application.applicant === user?._id
    ) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);
   const dispatch=useDispatch()
    
   // getSingleJob(jobId);   
  
    // Update `isApplied` when `singleJob` or `user` changes
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getJobById/${jobId}`, {
                    withCredentials: true
                });
               //console.log(res.data)
                if (res.data.success) {
                    setIsApplied(res.data.job.application.some(application=>application.applicant === user?._id))
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response?.data?.message);
            }
        };

        fetchSingleJob();
    }, [singleJob,user?._id,dispatch,jobId]);
    

    // Function to handle job application
    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/applyJob/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                const updatedSingleJob = {...singleJob, application:[...singleJob.application,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                setIsApplied(true); // Set isApplied to true after applying
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log("ERROR", error);
            toast.error(error.response?.data?.message || "Error occurred while applying");
        }
    };

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-2xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold text-xl'} variant="ghost">{singleJob?.position} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold text-xl'} variant="ghost">{singleJob?.jobType} </Badge>
                        <Badge className={'text-[#7209b7] font-bold text-xl'} variant="ghost">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed text-xl' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>{singleJob?.Description}</h1>
            <div className='my-4 flex flex-col gap-8'>
                <h1 className='font-bold my-1  text-2xl'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1 text-2xl'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1 text-2xl'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1 text-2xl'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span></h1>
                <h1 className='font-bold my-1 text-2xl'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
                <h1 className='font-bold my-1 text-2xl'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.application?.length}</span></h1>
                <h1 className='font-bold my-1 text-2xl'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
            </div>
        </div>
    );
}

export default JobDescription;
