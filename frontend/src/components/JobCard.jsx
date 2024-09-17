import React from 'react'
import { Badge } from './ui/badge'
//this is the latest job card which is been shown
export const JobCard = ({key,job}) => {
  return (
<div  className='p-8  rounded-xl shadow-2xl bg-white border border-gray-400 cursor-pointer w-[500px] h-[300px]'>
    <div>
        <h1 className='font-medium text-2xl'>{job?.company?.name}</h1>
        <p className='text-base text-gray-500'>{job?.location}</p>
    </div>
    <div>
        <h1 className='font-bold text-3xl my-3'>{job?.title}</h1>
        <p className='text-base text-gray-600 mt-2 text-md'>{job?.description}</p>
    </div>
    <div className='flex items-center gap-3 mt-20'>
        <Badge className={'text-blue-700 font-bold text-lg'} variant="ghost">{job?.position} Positions</Badge>
        <Badge className={'text-[#F83002] font-bold text-lg '} variant="ghost">{job?.jobType}</Badge>
        <Badge className={'text-[#7209b7] font-bold text-lg'} variant="ghost">{job?.salary} LPA</Badge>
    </div>
</div>
  )
}
