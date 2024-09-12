import React from 'react'
import { Badge } from './ui/badge'
//this is the latest job card which is been shown
export const JobCard = () => {
  return (
<div  className='p-8  rounded-lg shadow-2xl bg-white border border-gray-400 cursor-pointer w-[500px] h-[400px]'>
    <div>
        <h1 className='font-medium text-2xl'>jobcompanyname</h1>
        <p className='text-base text-gray-500'>India</p>
    </div>
    <div>
        <h1 className='font-bold text-2xl my-3'>jobtitle</h1>
        <p className='text-base text-gray-600 mt-2'>jobdescription</p>
    </div>
    <div className='flex items-center gap-3 mt-20'>
        <Badge className={'text-blue-700 font-bold'} variant="ghost">jobpositionPositions</Badge>
        <Badge className={'text-[#F83002] font-bold'} variant="ghost">jobjobType</Badge>
        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">yLPA</Badge>
    </div>
</div>
  )
}
