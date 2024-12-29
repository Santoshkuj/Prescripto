import {Router} from 'express'
import { allDoctors } from '../controllers/doctorController.js'

const doctorRouter = Router()

doctorRouter.get('/list',allDoctors)

export default doctorRouter