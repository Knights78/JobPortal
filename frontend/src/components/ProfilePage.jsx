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
const ProfilePage = () => {
  const skills=["html","css","Js"]
  const [open,setOpen]=useState(true)
  const haveResume=true
  const {user}=useSelector(store=>store.auth)
//  console.log("Profile page user",user)
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white border border-gray-400 rounded-2xl my-5 p-8 mt-12">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="h-24 2-24">
              <AvatarImage src=""></AvatarImage>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">Full Name</h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Voluptatibus pariatur iure exercitationem.
              </p>
            </div>
          </div>
          <Button>
            <Pen />
          </Button>
        </div>
        <div className="my-5 flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <Mail />
            <span>saifushaikh102@gmail.com</span>
          </div>
          <div className="flex items-center gap-5">
            <Phone />
            <span>778718819</span>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-lg">skills</h1>
            <div  className='flex items-center  gap-2'>
            {skills.map((item, key) => (
               skills.length==0? <Badge className='text-lg'>{item}</Badge>:<span>NA</span>
            ))}
            </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5 mt-5'>
                    <Label className="text-lg font-bold">Resume</Label>
                    {haveResume ? <a target='blank' className='text-blue-500 w-full hover:underline cursor-pointer'>user?.profile?.resumeOriginalName</a>: <span>NA</span>}    
        </div>

      </div> 
      <div className='max-w-4xl mx-auto bg-white rounded-2xl mt-10'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                {/* Applied Job Table   */}
                <AppliedJobTable />
       </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} user={user}/>
    </div>
  );
};

export default ProfilePage;
