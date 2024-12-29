import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import cookieParser from 'cookie-parser'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'


config()
const app = express()

//
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL,process.env.ADMIN_URL],
    credentials:true
}))

//
app.use('/api/admin',adminRouter)
app.use('/api/doctors',doctorRouter)
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send('API Working')
})

app.listen(port, ()=>{
    console.log('server started on port',port);
})