import React from 'react'
import Navbar from './shared/Navbar'
import { Job } from './Job'
import getAllJob from '@/hooks/getAllJob'
import { useDispatch, useSelector } from 'react-redux'
const BrowsePage = () => {
    // const job=[1,2,3,4]
    getAllJob()
    const {allJobs}=useSelector(store=>store.job)
    const dispatch=useDispatch()
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto my-10 '>
            <h1>Search Jobs</h1>
            <div className='grid grid-cols-3 gap-6 mt-6'>
                {
                    allJobs.map((job,key)=>(
                        <Job key={job._id} job={job}/>
                    ))
                }
            </div>
        </div>

    </div>
  )
}

export default BrowsePage