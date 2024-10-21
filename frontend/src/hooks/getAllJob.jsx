import React, { useEffect } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { JOB_API_END_POINT } from '@/utils/constant'
import { setAllJob } from '@/redux/jobSlice'
import { toast } from 'sonner'
const getAllJob = () => {
    const dispatch=useDispatch()
    //console.log("func called")
    useEffect(()=>{
        const fetchAllJob=async()=>{
            try {
                const res=await axios.get(`${JOB_API_END_POINT}/getAllJobs`,{
                    withCredentials:true
                })
                //console.log(res)
                if(res.data.success)
                {
                    console.log("Inside job")
                    dispatch(setAllJob(res.data.jobs))
                }

            } catch (error) {
                console.log(error)
                toast.error(error.res.data.message || "Error occured to fetchJobs")
            }
        }
        fetchAllJob();
    },[])
}

export default getAllJob