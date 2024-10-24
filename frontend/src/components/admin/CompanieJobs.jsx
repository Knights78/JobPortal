import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import AdminJobsTable from './AdminJobsTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
const CompanieJobs = () => {
    const[input,setInput]=useState("")
    const navigate = useNavigate();
    const dispatch=useDispatch()
    useGetAllAdminJobs();
    useEffect(()=>{
        dispatch(setSearchJobByText(input))
    },[input])
  return (
    <div>
    <Navbar />
    <div className='max-w-6xl mx-auto my-10'>
      <div className='flex items-center justify-between my-5'>
        <Input
          className="w-fit text-lg"
          placeholder="Filter by name, role"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button className='text-lg' onClick={() => navigate("/admin/jobs/create")}>WANT TO POST NEW JOB</Button>
      </div>
      <AdminJobsTable />
    </div>
  </div>
  )
}

export default CompanieJobs