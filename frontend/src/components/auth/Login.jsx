import { Label } from '@radix-ui/react-label'
import React from 'react'
import { useState } from 'react'
import { Input } from '../ui/input'
import { RadioGroup } from '@radix-ui/react-radio-group'
import Navbar from '../shared/Navbar'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { FaGoogle } from "react-icons/fa";
import {useGoogleLogin} from "@react-oauth/google"
import { setUser } from '@/redux/authSlice'
import useAxiosInterceptor from './useAxiosInterceptor'
const Login = () => {
    const dispatch=useDispatch()
    const {loading}=useSelector(store=>store.auth)//it will go in store thriugh which it will access the auth then from auth i will take the intial state
    const navigate=useNavigate()
    const[input,setInput]=useState({
        email:"",
        password:"",
        role:""
    })
    //useAxiosInterceptor();
   // const[loading,setLoading]=useState(false)
    const handleonChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const handleSubmit=async(e)=>{
     e.preventDefault();
     //console.log(input)
     try {
        dispatch(setLoading(true))
        const res=await axios.post(`${USER_API_END_POINT}/login`,input,{
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        })
        if(res.data.success)
        {
            dispatch(setUser(res.data.user))
            //console.log(res.data.user)
            navigate('/')
            toast.success(res.data.message);
        }
     } 
     catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message); // Display error message from backend
        } else {
            toast.error("Login failed"); // Default error message
        }
        console.log(error);
    }
     finally{
        dispatch(setLoading(false))
     }
    }
    const googleLoginSuccess=async(authResult)=>{
        
        try {
            // Initialize Axios with base URL
            const api = axios.create({
              baseURL: 'http://localhost:3000/api/v1/user',
            });
        
            // Send auth code to the backend to handle Google login/signup
            const response = await api.post(`/google-login`, { code: authResult.code },{withCredentials:true});
            
            if (response.data.success) {
              localStorage.setItem('token', response.data.token);
             // console.log(response.data.user)
              toast.success(response.data.message);
              dispatch(setUser(response.data.user))
              navigate('/');
            } else {
              // Handle user exists but different provider
              if (response.data.message.includes('different provider')) {
                toast.error(response.data.message);
                navigate('/login'); // Or redirect to an appropriate page
              } else {
                toast.error(response.data.message);
              }
            }
          } catch (error) {
            console.log(error);
            toast.error('Google login failed. Please try again.');
          }
    }

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: googleLoginSuccess,
        onError: () => toast.error('Google login failed'),
        flow: 'auth-code'
    });
    
    
  return (
    <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-2xl mb-5 '>Login</h1>
                    <div className='my-2'>
                        <Label className='text-lg'>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            className='text-lg'
                            onChange={handleonChange}
                            placeholder="xyz@gmail.com"
                        />
                    </div>

                    <div className='my-2'>
                        <Label className='text-lg'>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            className='text-lg'
                            onChange={handleonChange}
                            placeholder="********"
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2 text-lg">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={handleonChange}
                                    className="cursor-pointer text-lg"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2 text-lg">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={handleonChange}
                                    className="cursor-pointer text-lg"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading ? <button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </button> : <button type="submit" className="w-full my-4 text-lg bg-gray-800 text-white rounded-md">Login</button>
                    }
                    <div>
                        <button className='w-full my-4 flex items-center ml-20 pl-40 text-lg' onClick={handleGoogleLogin}>Login with google  <span className='ml-4'>< FaGoogle/></span> </button>
                    </div>
                    <span className='text-md mt-10'>Don't have an account? <Link to="/signup" className='text-blue-600 text-md'>Signup</Link></span>
                </form>
            </div>
        </div>
  )
}

export default Login