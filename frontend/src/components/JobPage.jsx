import React from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import { Job } from './Job'
import { useSelector } from 'react-redux'
// in this page we will find the job according to our needs like filtering jobs and a single particular job
const JobPage = () => {
    //const job=[1,2,3,4,5,6,7,8,9]
    const {allJobs}=useSelector(store=>store.job)
   // console.log(allJobs)
  return (
    <div>
        <Navbar/>
        <div className='w-full max-w-[90%] mt-20 mx-auto'>
            <div className='flex gap-8 mt-2'>
                <div className='w-40% mr-9'>
                <FilterCard/>
                </div>
                {
                    
                     allJobs.length <=0 ?(<span>JOB NOT FOUNd</span>):(
                        <div className='flex-1 h-[90vh] overflow-y-auto pb-8 '>
                            <div className='grid grid-cols-3 gap-5'>
                                 {allJobs.map((job)=>(
                                    <Job job={job} />//this is the jobCard of jobPage
                                 ))}
                            </div>
                          
                        </div>
                        
                     )
                     
                }
            </div>
        </div>
    </div>
  )
}

export default JobPage