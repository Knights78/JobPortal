import React, { useEffect } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { toast } from 'sonner'
const getSingleJob = (jobId) => {
    const dispatch=useDispatch()
   // console.log("func called")
    useEffect(()=>{
        const fetchSingleJob=async()=>{
            try {
                const res=await axios.get(`${JOB_API_END_POINT}/getJobById/${jobId}`,{
                    withCredentials:true
                })
                if(res.data.success)
                {
                    dispatch(setSingleJob(res.data.job))
                }

            } catch (error) {
                console.log(error)
                toast.error(error.res.data.message || "Error occured to fetchJobs")
            }
        }
        fetchSingleJob(jobId);
    },[])
}

export default getSingleJob