import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DeleteIcon } from 'lucide-react'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'sonner'
import { setCompany } from '@/redux/companySlice'
const CompaniesTable=()=>{
    
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {companys,searchCompanyByText}=useSelector(store=>store.company)
    //console.log("text",searchCompanyByText)
    const [filterCompany,setFilterCompany]=useState(companys)
    console.log(filterCompany)
    useEffect(()=>{
        const filteredCompany=companys.length >=0 && companys.filter((company)=>{
            if(!searchCompanyByText)
            {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        })
        //console.log("FILTERED",filteredCompany)
        setFilterCompany(filteredCompany)

    },[companys,searchCompanyByText])
    const handleDelete=async(companyId)=>{
        try {
            const res=await axios.delete(`${COMPANY_API_END_POINT}/deleteCompany/${companyId}`,{
                withCredentials:true
            })
            if(res.data.success)
            {
                dispatch(setCompany(res.data.companies))
                toast.success(res.data.message)
                
            }


        } catch (error) {
            console.log(error)
            toast.error(error.res.data.message)
        }

    }
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
                    filterCompany?.map((company) => (
                        <tr>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={company?.logo}/>
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
                                        <div onClick={()=>handleDelete(company._id)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                            <DeleteIcon className='w-4' />
                                            <span>Delete</span>
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