import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./utils/db.js"
import userRouter from "./routes/user.route.js"
import companyRouter from "./routes/company.route.js"
import jobRouter from "./routes/job.route.js"
import applicationRouter from "./routes/application.route.js"
dotenv.config({})
connectDB();
const app=express()
app.use(express.json())//whatever will be the request we will don it in json
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
const corsOptions={
    origin:'http://localhost:5176',
    credentials:true
}

app.use(cors(corsOptions))//cors is used for the frontend to coomunicate with the backend
const PORT=process.env.PORT || 3000

app.use('/api/v1/user',userRouter)
app.use('/api/v1/company',companyRouter)
app.use('/api/v1/job',jobRouter)
app.use('/api/v1/application',applicationRouter)

app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
})