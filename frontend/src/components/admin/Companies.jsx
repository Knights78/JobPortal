import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { setSearchCompanyByText } from '@/redux/companySlice'


const Companies = () => {
    const [input, setInput] = useState("");
    const navigate=useNavigate()
    useGetAllCompanies() 
    const dispatch=useDispatch()
    useEffect(()=>{
     // console.log(input)
      dispatch(setSearchCompanyByText(input))
    },[input])
  return (
    <div>
    <Navbar />
    <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
            <Input
                className="w-fit text-xl"
                placeholder="Filter by name"
                onChange={(e) => setInput(e.target.value)}
            />
            <Button  className='text-xl' onClick={() => navigate("/admin/companies/create")}>New Company</Button>
        </div>
        <CompaniesTable/>
    </div>
</div>
  )
}

export default Companies