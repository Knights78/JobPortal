import { setSingleAdminJob } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetJobById = (jobId) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getJobById/${jobId}`,{withCredentials:true});
                //console.log(res.data.company);
                if(res.data.success){
                    dispatch(setSingleAdminJob(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    },[jobId, dispatch])
}

export default useGetJobById
