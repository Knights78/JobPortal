import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import {  Mail, Pen, Phone } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Label } from "@radix-ui/react-label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const ProfilePage = () => {
  
  const [open,setOpen]=useState(false)
  
  const haveResume=true
  const {user}=useSelector(store=>store.auth)
  const isGoogleLogin=user?.provider==='google'
  const navigate=useNavigate()
  
//  console.log("Profile page user",user)
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white border border-gray-400 rounded-2xl my-5 p-8 mt-12">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="h-24 2-24">
              <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" className="h-20 w-20"></AvatarImage>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">{user?.fullname}</h1>
              <p>
              {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button onClick={()=>setOpen(true)}>
            
              <Pen/>
            
          </Button>
        </div>
        <div className="my-5 flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-5">
            <Phone />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-lg">skills</h1>
            <div  className='flex items-center  gap-2'>
            {
                user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
            }
            </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5 mt-5'>
                    <Label className="text-lg font-bold">Resume</Label>
                    {
                        haveResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }    
        </div>

      </div> 
      <div className='w-[100%] pl-40 ml-[300px] bg-white rounded-2xl mt-10'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                {/* Applied Job Table   */}
                <AppliedJobTable />
       </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} user={user} isGoogleLogin={isGoogleLogin}/>
    </div>
  );
};

export default ProfilePage;
