import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"

const changeAvailability = async (req,res) => {
    try {
        const {docId} = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available: !docData.available})

        res.status(200).json({
            success: true,
            message: 'Availability changed'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const allDoctors = async (req,res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.status(200).json({
            success: true,
            doctors
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message : error.message
        })
    }
}

const logniDoctor = async (req,res) => {
    try {
        const {email,password} = req.body
        const doctor = await doctorModel.findOne({email})
        if (!doctor) {
            return res.status(400).json({
                success: true,
                message: 'Invalid credentials'
            })
        }
        const isMatch = await bcrypt.compare(password,doctor.password)
        if (!isMatch) {
            return res.status(400).json({
                success: true,
                message: 'Invalid password'
            })
        }
        const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET,{expiresIn:'1d'})

        res.cookie('docToken',token,{
            httpOnly: true,
            secure: true,
            maxAge: 24*60*60*1000
        })
        res.status(200).json({
            success: true,
            message: 'LoggedIn successfully',
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message : error.message
        }) 
    }
}

const appointmentsDoctor = async (req,res) => {
    try {
        const {docId} = req.body
        const appointments = await appointmentModel.find({docId})

        res.status(200).json({
            success:true,
            appointments
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message : error.message
        }) 
    }
}

export {
    changeAvailability,
    allDoctors,
    logniDoctor,
    appointmentsDoctor
}