import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
export const register=async(req,res)=>{
    try {
        const{fullname,email,phoneNumber,password,role}=req.body
        if(!fullname || !email || !phoneNumber || !password || !role)
        {
            return res.status(400).json({
                message:"All the fields should be filled",
                success:false
            })
        }
        const user=await User.findOne({email})//key value pair of email is same that is why written only one timr
        //if already same email is regsteres
        if(user)
        {
            return res.status(400).json({
                message:"Email already registered",
                success:false
            })
        }

        const hashedPassword=await bcrypt.hash(password,10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role
        })
        return res.json({
            message:"account created succesfully",
            success:true
        })
    } catch (error) {
        console.log(error,"error in the user controller")
    }
}

export const login=async(req,res)=>{
    try {
        const {email,password,role}=req.body
        if(!email ||  !password || !role)
            {
                return res.status(400).json({
                    message:"All the fields should be filled",
                    success:false
                })
            }
            let user=await User.findOne({email})
            if(!user)
            {
                return res.status(400).json({
                    message:"invalid credentials",
                    success:false
                })
            }
            const isPassword=await bcrypt.compare(password,user.password)
            if(!isPassword)
            {
                return res.status(400).json({
                    message:"password is wrong",
                    success:false
                })
            }
            //check its role
            if(role!=user.role)
            {
                return res.status(400).json({
                    message:"Role is  wrong",
                    success:false
                })
            }
           
           const tokenData={//i am generatinng token based on the userId only
            userId:user._id
           }
           const token=await jwt.sign(tokenData,process.env.SECRET_KEY)
           user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
           return res.status(200).cookie("token",token,{httpsOnly:true,sameSite:'strict'}).json({
            message:"Login succesfull",
            user,
            success:true
           })



    } catch (error) {
         console.log(error,"error in the user controller (login)")
    }
}

export const logout=async(req,res)=>{
    try {
        return res.cookie("token","").json({
            message:"Logout succesfully",
            success:true
        });
    } catch (error) {
        console.log(error,"Logout error")
    }
}


export const updateProfile=async(req,res)=>{
    try {
        const{fullname,email,phoneNumber,bio,skills}=req.body
        const file = req.file;
       
            let skillsArray;
            if(skills){
                skillsArray = skills.split(",");
            }
          const userId=req.id
          let user=await User.findById(userId)
          if(!user)
          {
            return res.json({
                message:"User not found",
                success:false

            })
          }
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

          await user.save()

          user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })


        
    } catch (error) {
        console.log(error,"update error")
    }
}