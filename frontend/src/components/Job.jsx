import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
//this is the job where user will search
export const Job = ({job}) => {
  
    const navigate=useNavigate()
    const daysAgoFunction=(time)=>{
        const createdAt=new Date(time);
        const currentTime=new Date();
        const difference=currentTime-createdAt
        return Math.floor(difference/(1000*24*60*60))
    }
    return (
        <div className='p-8 rounded-md shadow-xl bg-white border border-gray-100 w-full'> {/* Set width to full to fill the grid */}
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt)==0 ? "Today":`${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>

            <div className='flex items-center gap-4 my-4'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{job?.location}</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-xl my-3'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-3 mt-6'>
                <Badge className={'text-blue-700 font-bold  text-lg'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold text-lg'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold text-lg'} variant="ghost">{job?.salary} LPA</Badge>
            </div>
            <div className='flex items-center gap-6 mt-6'>
                <Button onClick={()=>navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button className="bg-[#7209b7]">Save For Later</Button>
            </div>
        </div>
    )
}

