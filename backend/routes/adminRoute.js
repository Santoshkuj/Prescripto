import { Router } from "express";
import upload from "../middlewear/multer.js";
import { addDoctor,adminDashboard,appointmentAdmin,cancelAppointmentAdmin,loginAdmin,logout } from "../controllers/adminController.js";
import authAdmin from "../middlewear/authAdmin.js";
import { allDoctors, changeAvailability } from "../controllers/doctorController.js";

const adminRouter = Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.get('/logout',authAdmin,logout)
adminRouter.get('/alldoctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,appointmentAdmin)
adminRouter.post('/cancel-appointment',authAdmin,cancelAppointmentAdmin)
adminRouter.get('/dashboard',authAdmin,adminDashboard)


export default adminRouter