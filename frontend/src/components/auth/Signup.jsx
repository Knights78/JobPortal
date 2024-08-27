import { Label } from '@radix-ui/react-label'
import React from 'react'
import { useState } from 'react'
import { Input } from '../ui/input'
import Navbar from '../shared/Navbar'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { Link } from 'react-router-dom'

const Signup = () => {
    const[input,setInput]=useState({
        fullname:"",
        email:"",
        phonenumber:"",
        password:"",
        role:""

    })
    const handleonChange=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }
    const handleSubmit=()=>{

    }
  return (
    <div>
        <Navbar/>
    <div className='flex items-center justify-center mx-auto max-w-7xl'>
    <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
        <h1 className='font-bold text-xl mb-5'>SIGN UP</h1>

                    <div className='my-2'>
                    <Label>Full Name</Label>
                        <Input
                        type='text'
                        placeholder='enter full name'
                        name='fullname'
                        value={input.fullname}
                        onChange={handleonChange}
                        />
                    </div>

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
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={handleonChange}
                            placeholder="388308080"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={handleonChange}
                            placeholder="*****0008"
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
                     
                    {/* {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Signup</Button>
                    } */}
                    <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>

            
    </form>
    </div>
    </div>
  )
}

export default Signup