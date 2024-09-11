import React from 'react'
import { JobCard } from './JobCard'
export const LatestJobs = () => {
    const job=[1,2,3,4,5,6,7,8,9]
  return (
    <div className='flex flex-col items-center my-20  ml-[250px] mr-[200px]'>
        <h1 className='text-4xl fonr-bold '><span className='text-[#6A38C2]'>Latest & Top</span> Job Openings</h1>
        <div className='grid grid-cols-3 gap-20 mt-10'>
            {
                job.slice(0,6).map((key,index)=> <JobCard/> )
            }
        </div>

    </div>
  )
}
