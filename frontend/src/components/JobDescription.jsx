import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
const JobDescription = () => {
    const applyJobHandler=()=>{

    }
    const isApplied=false
  return (
    <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-2xl'>singleJob?.title</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">12 Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">remote</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">singleJob?.salary LPA</Badge>
                    </div>
                </div>
                <Button
                onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4 flex flex-col gap-8'>
                <h1 className='font-bold my-1 text-xl '>Role: <span className='pl-4 font-normal text-gray-800'>frotned</span></h1>
                <h1 className='font-bold my-1 text-xl'>Location: <span className='pl-4 font-normal text-gray-800'>banglore</span></h1>
                <h1 className='font-bold my-1 text-xl'>Description: <span className='pl-4 font-normal text-gray-800'>good developer are required</span></h1>
                <h1 className='font-bold my-1 text-xl'>Experience: <span className='pl-4 font-normal text-gray-800'>singleJob?.experience yrs</span></h1>
                <h1 className='font-bold my-1 text-xl'>Salary: <span className='pl-4 font-normal text-gray-800'>singleJob?.salary1LPA</span></h1>
                <h1 className='font-bold my-1 text-xl'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>singleJob?.applications?.length</span></h1>
                <h1 className='font-bold my-1 text-xl'>Posted Date: <span className='pl-4 font-normal text-gray-800'>singleJob?.createdAt.split("T")[0]</span></h1>
            </div>
        </div>
  )
}

export default JobDescription