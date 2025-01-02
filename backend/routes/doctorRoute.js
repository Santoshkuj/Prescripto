import {Router} from 'express'
import { allDoctors, appointmentsDoctor, logniDoctor } from '../controllers/doctorController.js'
import authDoctor from '../middlewear/authDoc.js'

const doctorRouter = Router()

doctorRouter.get('/list',allDoctors)
doctorRouter.post('/login',logniDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)

export default doctorRouter