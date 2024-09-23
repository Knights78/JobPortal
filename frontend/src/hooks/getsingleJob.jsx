import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';

const getSingleJob = (jobId) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user); // Assuming you have user in your Redux store

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getJobById/${jobId}`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response?.data?.message || "Error occurred while fetching job");
            }
        };

        fetchSingleJob();
    }, [dispatch, jobId]);

    const singleJob = useSelector(state => state.job.singleJob); // Assuming you store the job in your Redux state
    const isInitiallyApplied = singleJob?.applications?.some(application => 
        application.applicant === user?._id
    ) || false;

    // Now you can use isInitiallyApplied as needed
    console.log("Is user initially applied:", isInitiallyApplied);
};

export default getSingleJob;
