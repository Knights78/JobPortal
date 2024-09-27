import express from "express"
import { companyRegister,getCompany,getCompanyById,updateCompany } from "../controllers/company.controller.js"
import { isAuthenticated } from "../middleware/isAutheticated.js"
//we need middleware so that only the autheticated users are allow to access this links
import { singleUpload } from "../middleware/multer.js"
import { deleteCompany } from "../controllers/company.controller.js"
const companyRouter=express.Router()

companyRouter.post('/companyRegister',isAuthenticated,companyRegister)
companyRouter.get('/getCompany',isAuthenticated,getCompany)
companyRouter.get('/getCompanyById/:id',isAuthenticated,getCompanyById)
companyRouter.put('/updateCompany/:id',isAuthenticated,singleUpload,updateCompany)
companyRouter.delete('/deleteCompany/:id',isAuthenticated,deleteCompany)
// companyRouter.delete('/deleteCompany/:id',isAuthenticated,deleteCompany)

export default companyRouter