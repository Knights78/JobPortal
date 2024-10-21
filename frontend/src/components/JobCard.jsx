import React from 'react';
import { Badge } from './ui/badge';

export const JobCard = ({ job, company }) => {

  return (
    <div className='p-8 rounded-xl shadow-2xl bg-white border border-gray-400 cursor-pointer w-[420px] h-[380px]'>
        {/* Flexbox container to align logo and name in a single line */}
        <div className='flex items-center mb-4'>
            {/* Display the company logo if available */}
            {job?.company?.logo ? (
                <img
                  src={job?.company.logo}
                  className='w-10 h-10 mr-4' // Adjust width, height, and margin
                  onError={(e) => e.target.style.display = 'none'} // Hide if image fails to load
                />
            ) : (
                <p className="text-sm text-gray-500 mr-4">No logo</p>
            )}
            
            {/* Display the company name */}
            <h1 className='font-bold text-xl'>{company?.name}</h1>
        </div>
        
        <div>
            <p className='text-base text-gray-500'>{job?.location}</p>
        </div>
        
        <div>
            <h1 className='font-bold text-3xl my-3'>{job?.title}</h1>
            <p className='text-lg text-gray-600 mt-2'>{job?.description}</p>
        </div>

        <div className='flex items-center gap-3 mt-16'>
            <Badge className='text-blue-700 font-bold text-lg' variant="ghost">{job?.position} Positions</Badge>
            <Badge className='text-[#F83002] font-bold text-lg' variant="ghost">{job?.jobType}</Badge>
            <Badge className='text-[#7209b7] font-bold text-lg' variant="ghost">{job?.salary} LPA</Badge>
        </div>
    </div>
  );
};
