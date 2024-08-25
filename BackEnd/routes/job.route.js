import express from "express"
import { postJob,getAllJobs,getJobById,getAdminJobs } from "../controllers/job.controller.js"
import { isAuthenticated } from "../middleware/isAutheticated.js"

const jobRouter=express.Router()
jobRouter.post('/postJob',isAuthenticated,postJob)
jobRouter.get('/getAllJobs',isAuthenticated,getAllJobs)
jobRouter.get('/getJobById/:id',isAuthenticated,getJobById)
jobRouter.get('/getAdminJobs',isAuthenticated,getAdminJobs)

export default jobRouter
