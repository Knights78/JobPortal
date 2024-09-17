import React from 'react'
import { JobCard } from './JobCard'
import { useSelector } from 'react-redux'
export const LatestJobs = () => {
    const {allJobs}=useSelector(state=>state.job)
  return (
    <div className='flex flex-col items-center my-20  ml-[250px] mr-[200px]'>
        <h1 className='text-4xl fonr-bold '><span className='text-[#6A38C2]'>Latest & Top</span> Job Openings</h1>
        <div className='grid grid-cols-3 gap-20 mt-10'>
            {
                allJobs.length!==0 ? allJobs.slice(0,6).map((job)=> <JobCard key={job._id} job={job}/> ):(<span>NO JOB AVAILABLE RIGHT NOW</span>)
            }
        </div>

    </div>
  )
}
