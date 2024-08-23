import express from "express"
import { register,login,logout,updateProfile } from "../controllers/user.controller.js"
import { isAuthenticated } from "../middleware/isAutheticated.js"
//we need middleware so that only the autheticated users are allow to access this links

const userRouter=express.Router()

userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.get('/logout',logout)
userRouter.post('/profile/update',isAuthenticated,updateProfile)

export default userRouter

