import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';


const shortlistingStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
 // console.log("ALL  APPLICANTS",applicants)
    const statusHandler = async (status, id) => {
        console.log('called');
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/updateStatus/${id}`, { status });
           // console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
  return (
    <div>
    <Table>
        <TableCaption className='text-lg'>A list of your recent applied user</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className='text-lg'>FullName</TableHead>
                <TableHead className='text-lg'>Email</TableHead>
                <TableHead className='text-lg'>Contact</TableHead>
                <TableHead className='text-lg'>Resume</TableHead>
                <TableHead className='text-lg'>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                applicants && applicants?.application?.map((item) => (
                    <tr key={item._id}>
                        <TableCell className='text-lg'>{item?.applicant?.fullname}</TableCell>
                        <TableCell className='text-lg'>{item?.applicant?.email}</TableCell>
                        <TableCell className='text-lg'>{item?.applicant?.phoneNumber}</TableCell>
                        <TableCell >
                            {
                                item.applicant?.profile?.resume ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                            }
                        </TableCell>
                        <TableCell className='text-lg'>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                        <TableCell className="float-right cursor-pointer">
                            <Popover>
                                <PopoverTrigger>
                                    <MoreHorizontal />
                                </PopoverTrigger>
                                <PopoverContent className="w-32">
                                    {
                                        shortlistingStatus.map((status, index) => {
                                            return (
                                                <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                    <span>{status}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </PopoverContent>
                            </Popover>

                        </TableCell>

                    </tr>
                ))
            }

        </TableBody>

    </Table>
</div>
  )
}

export default ApplicantsTable