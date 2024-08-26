import express from "express"
import { isAuthenticated } from "../middleware/isAutheticated.js"
import { applyJob } from "../controllers/application.controller.js"
import { getappliedJobs } from "../controllers/application.controller.js"//for user
import { getApplicants } from "../controllers/application.controller.js"//for admin
import { updateStatus } from "../controllers/application.controller.js"
const applicationRouter=express.Router()

applicationRouter.post('/applyJob/:id',isAuthenticated,applyJob)

applicationRouter.get('/getappliedJobs',isAuthenticated,getappliedJobs)

applicationRouter.get('/getApplicants/:id',isAuthenticated, getApplicants)

applicationRouter.post('/updateStatus/:id',isAuthenticated,updateStatus)

export default applicationRouter
