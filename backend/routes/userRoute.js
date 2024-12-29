import {Router} from 'express'
import { registerUser,loginUser, logout, updateProfile, getProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorPay } from '../controllers/userController.js'
import authUser from '../middlewear/authUser.js'
import upload from '../middlewear/multer.js'

const userRouter = Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/logout',logout)
userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verify-razorpay',authUser,verifyRazorPay)

export default userRouter