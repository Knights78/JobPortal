import express from "express"
import { register,login,logout,updateProfile } from "../controllers/user.controller.js"
import { isAuthenticated } from "../middleware/isAutheticated.js"
//we need middleware so that only the autheticated users are allow to access this links
import { singleUpload } from "../middleware/multer.js"
import { googleLogin } from "../controllers/user.controller.js"
const userRouter=express.Router()

userRouter.post('/register',singleUpload,register)
userRouter.post('/login',login)
userRouter.get('/logout',logout)
userRouter.post('/profile/update',isAuthenticated,updateProfile)
userRouter.post('/google-login',googleLogin)

export default userRouter

