import express from "express"
import { register,login,logout,updateProfile } from "../controllers/user.controller.js"
import { isAuthenticated } from "../middleware/isAutheticated.js"
//we need middleware so that only the autheticated users are allow to access this links
import { singleUpload } from "../middleware/multer.js"
import { googleLogin } from "../controllers/user.controller.js"
// import { googleLoginVerify } from "../controllers/user.controller.js"
const userRouter=express.Router()

userRouter.post('/register',singleUpload,register)
userRouter.post('/login',login)
userRouter.get('/logout',logout)
userRouter.post('/profile/update',isAuthenticated,updateProfile)
userRouter.post('/google-login',googleLogin)


export default userRouter

// export const googleLogin = async (req, res) => {
//     try {
//       const { code } = req.body;
  
//       // Get the Google token using the code
//       const googleRes = await oauth2client.getToken(code);
//       oauth2client.setCredentials(googleRes.tokens);
  
//       // Get user info from Google API
//       const userRes = await axios.get(
//         `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
//       );
//       const { id: googleId, name, email, picture } = userRes.data;
  
//       // Check if user already exists
//       let user = await User.findOne({ googleId });
  
//       if (user) {
//         // If user exists, send a response indicating the user has already signed up
//         const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: "7d" });
//         return res.json({
//           success: true,
//           token,
//           user,
//           message: "User already signed up.",
//         });
//       }
  
//       // If user doesn't exist, create a new user
//       user = await User.create({
//         googleId, // Store the Google ID
//         fullname: name,
//         email: email,
//         profile: {
//           profilePhoto: picture,
//         },
//         provider: "google",
//       });
  
//       const { _id } = user;
//       const token = jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "7d" });
  
//       return res.json({
//         success: true,
//         token,
//         user,
//         message: "SUCCESS GOOGLE AUTH",
//       });
//     } catch (error) {
//       console.log(error);
//       return res.json({
//         success: false,
//         message: "GOOGLE AUTH FAILED",
//       });
//     }
//   };