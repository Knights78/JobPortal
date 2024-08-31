import { Label } from '@radix-ui/react-label'
import React from 'react'
import { useState } from 'react'
import { Input } from '../ui/input'
import { RadioGroup } from '@radix-ui/react-radio-group'
import Navbar from '../shared/Navbar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Toaster } from 'sonner'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const navigate=useNavigate()
    const[input,setInput]=useState({
        email:"",
        password:"",
        role:""
    })
    const[loading,setLoading]=useState(false)
    const handleonChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const handleSubmit=async(e)=>{
     e.preventDefault();
     console.log(input)
     try {
        const res=await axios.post(`${USER_API_END_POINT}/login`,input,{
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        })
        if(res.data.success)
        {
            navigate('/')
            toast.success(res.data.message);
        }
     } catch (error) {
        console.log(error)
     }
    }
  return (
    <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={handleonChange}
                            placeholder="xyz@gmail.com"
                        />
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={handleonChange}
                            placeholder="********"
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={handleonChange}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={handleonChange}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading ? <button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </button> : <button type="submit" className="w-full my-4">Login</button>
                    }
                    <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
                </form>
            </div>
        </div>
  )
}

export default Login