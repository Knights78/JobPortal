import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const CompaniesTable=()=>{
    const obj=[1,2,3,4,5]
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {companys}=useSelector(store=>store.company)
    return (
        <div className='mt-12'>
        <Table>
            <TableCaption className='text-xl'>A list of your recent registered companies</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead  className='text-xl'>Logo</TableHead>
                    <TableHead className='text-xl'>Name</TableHead>
                    <TableHead className='text-xl'>Date</TableHead>
                    <TableHead className="text-xl">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    companys?.map((company) => (
                        <tr>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage />
                                </Avatar>
                            </TableCell>
                            <TableCell className='text-lg'>{company?.name}</TableCell>
                            <TableCell className='text-lg'>{company?.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                            <Edit2 className='w-4' />
                                            <span>Edit</span>
                                        </div>
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

export default CompaniesTable