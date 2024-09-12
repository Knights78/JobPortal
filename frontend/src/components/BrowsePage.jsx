import React from 'react'
import Navbar from './shared/Navbar'
import { Job } from './Job'
const BrowsePage = () => {
    const job=[1,2,3,4]
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto my-10 '>
            <h1>Search Jobs</h1>
            <div className='grid grid-cols-3 gap-6 mt-6'>
                {
                    job.map((item,key)=>(
                        <Job/>
                    ))
                }
            </div>
        </div>

    </div>
  )
}

export default BrowsePage