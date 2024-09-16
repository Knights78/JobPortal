import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { oauth2client } from "../utils/oauthClient.js"
import axios from "axios"
import { verifyIdToken } from "../middleware/verifyGoogleToken.js"
import getDataUri from "../utils/dataUri.js"
import cloudinary from "../utils/cloudinary.js"
export const register=async(req,res)=>{
    try {
        const{fullname,email,phoneNumber,password,role}=req.body
        //console.log(fullname,email,phoneNumber,password,role)
        if(!fullname || !email || !phoneNumber || !password || !role)
        {
            return res.status(400).json({
                message:"All the fields should be filled",
                success:false
            })
        }
        const file=req.file
        const fileUri=getDataUri(file);
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content)
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
            role,
            profile:{
              profilePhoto:cloudResponse.secure_url
            },
           //bt default provider is local only
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
                    message:"invalid credential",
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

export const logout = async (req, res) => {
    try {
      return res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0) // Expire immediately to clear cookie
      }).json({
        message: "Logout successfully",
        success: true
      });
    } catch (error) {
      console.log("Logout error", error);
      return res.status(500).json({ message: "Logout failed" });
    }
  };


export const updateProfile=async(req,res)=>{
    try {
        const{fullname,email,phoneNumber,bio,skills}=req.body
        const file=req.file
        //console.log("data receiverd",req.body)
        //console.log("File received in the backend:", req.file);
        
        //const fileUri=getDataUri(file)
        //const cloudResponse=await cloudinary.uploader.upload(fileUri.content)
       // console.log(cloudResponse)
        let skillsArray = [];
        // Check if skills is provided and is a string
        if (skills) {
          if (typeof skills === "string") {
            // If it's a string, split it into an array
            skillsArray = skills.split(",");
          } else if (Array.isArray(skills)) {
            // If it's already an array, use it directly
            skillsArray = skills;
          } else {
            return res.status(400).json({
              message: "Invalid format for skills",
              success: false,
            });
          }
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
        
        if (file) {
          const fileUri = getDataUri(file); // Convert to base64 (implement getDataUri if not done already)
    
          const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
            folder: 'JobHunt', // This will store the resumes in the "resumes" folder
            resource_type: 'auto', // Ensures it handles various file types
          });
    
          // Store the Cloudinary URL and original file name in the user profile
          user.profile.resume = cloudResponse.secure_url;
          user.profile.resumeOriginalName = file.originalname;
        }
          await user.save()

          user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
       // console.log("USER",user)

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })


        
    } catch (error) {
        console.log(error,"update error")
    }
}
export const googleLogin = async (req, res) => {
    try {
      const { code } = req.body;
  
      // Get the Google token using the auth code
      const googleRes = await oauth2client.getToken(code);
      oauth2client.setCredentials(googleRes.tokens);
  
      // Get user info from Google API
      const userRes = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
      );
      const { id: googleId, name, email, picture } = userRes.data;
  
      // Check if user exists in DB
      let user = await User.findOne({ email });
  
      if (user) {
        // Check if the user was registered with Google
        if (user.provider !== 'google') {
          return res.json({
            success: false,
            message: "User exists with different provider. Please use regular login."
          });
        }
  
        // User exists and is logged in via Google - generate JWT token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: "7d" });
      //  console.log("USER",user)
        return res.json({
          success: true,
          token,
          user,
          message: "User logged in successfully with Google.",
        });
      }
      // const response = await axios.get(picture, { responseType: 'arraybuffer' });
      // const imageBuffer = Buffer.from(response.data, 'binary');
      
      // // Upload image to Cloudinary
      // const cloudResponse = await cloudinary.uploader.upload_stream({
      //   folder: 'Jobhunt',
      //   resource_type: 'image',
      // }).end(imageBuffer);
  
      // const { secure_url } = cloudResponse;
  
      // If user doesn't exist, create a new user
      user = await User.create({
        googleId,
        fullname: name,
        email,
        profile: {
          profilePhoto: picture
        },
        provider: "google",
      });
  
      const { _id } = user;
      const token = jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "7d" });
  
      return res.json({
        success: true,
        token,
        user,
        message: "User signed up successfully with Google.",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "Google authentication failed.",
      });
    }
  };
  

//   export const googleLoginVerify = async (req, res) => {
//     try {
//       const { googleAccessToken } = req.body;
  
//       // Verify the Google access token using the Google API
//       const response = await axios.get(`https://openidconnect.googleapis.com/v1/userinfo?access_token=${googleAccessToken}`);
  
//       if (response.status !== 200) {
//         return res.status(401).json({ message: 'Invalid Google credentials' });
//       }
  
//       const googleId = response.data.sub; // Assuming the user ID is in the response
  
//       // Find the user in your database based on the Google ID
//       const user = await User.findOne({ googleId });
  
//       if (!user) {
//         return res.status(401).json({ message: 'Invalid Google credentials' });
//       }
  
//       // Generate a JWT token for the user
//       const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
//       res.json({
//         success: true,
//         accessToken,
//         user,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   }