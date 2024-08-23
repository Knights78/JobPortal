import express from "express"
import { companyRegister,getCompany,getCompanyById,updateCompany } from "../controllers/company.controller.js"
import { isAuthenticated } from "../middleware/isAutheticated.js"
//we need middleware so that only the autheticated users are allow to access this links

const companyRouter=express.Router()

companyRouter.post('/companyRegister',isAuthenticated,companyRegister)
companyRouter.get('/getCompany',isAuthenticated,getCompany)
companyRouter.get('/getCompanyById/:id',isAuthenticated,getCompanyById)
companyRouter.post('/updateCompany/:id',isAuthenticated,updateCompany)

export default companyRouter