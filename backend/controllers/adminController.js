import validator from "validator";
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

const addDoctor = async (req, res) => {
  try {
    const {name,email,password,speciality,degree,experience,about,fees,address} = req.body;
    const imageFile = req.file

    if (!name|| !email|| !password|| !speciality|| !degree|| !experience|| !about|| !fees|| !address) {
        return res.json({
            success: false,
            message: 'Provide all details'
        })
    }
    if (!validator.isEmail(email)) {
        res.status({
            success: false,
            message: 'Please enter a valid email'
        })
    }
    if (password.length < 8) {
        return res.json({
            success: false,
            message: 'Provide a strong password'
        })
    }
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password,salt)

    const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
    const imageUrl = imageUpload.secure_url

    const doctorData = {
        name,
        email,
        password:hashedPassword,
        image:imageUrl,
        speciality,
        degree,
        experience,
        about,
        fees,
        address:JSON.parse(address),
        date:Date.now()
    }

    const newDoctor = new doctorModel(doctorData)
    await newDoctor.save()

    res.status(200).json({
        success:true,
        message:'Doctor Added'
    })
  } catch (error) {
    res.status(500).json({
        success: false,
        message : error.message
    })
  }
};

const loginAdmin = async (req,res) => {
    try {
        const {email,password} = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'1d'})

            res.cookie('adminToken',token,{
                maxAge:24*60*60*1000,
                secure:true,
                httpOnly:true
            })
            res.status(200).json({
                success:true,
                token,
                message:'Admin Loggedin successfully'
            })
        }else{
            res.status(400).json({
                success: false,
                message:'Invalid Credentials'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message : error.message
        })
    }
}

const logout = async (req,res) => {
    try {
        res.clearCookie('adminToken',{
            httpOnly:true,
            secure:true,
            maxAge:0
        })
        res.status(200).json({
            success:true,
            message: 'logout successfull'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message : error.message
        })
    }
}

const appointmentAdmin = async (req,res) => {
    try {
        const appointments = await appointmentModel.find({})

        res.status(200).json({
            success: true,
            appointments
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message : error.message
        })
    }
}

const cancelAppointmentAdmin = async (req, res) => {
    try {
      const { appointmentId } = req.body;
  
      const appointmentData = await appointmentModel.findById(appointmentId);
  
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
  
      const { docId, slotDate, slotTime } = appointmentData;
      const docData = await doctorModel.findById(docId);
      let slots_booked = docData.slots_booked;
      slots_booked = slots_booked[slotDate].filter((e) => e !== slotTime);
  
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
  
      res.status(200).json({
        success: true,
        message: "Appointment Cancelled",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  const adminDashboard = async (req,res) => {
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }
        res.status(200).json({
            success: true,
            dashData
          });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          });
    }
  }

export {
    addDoctor,
    loginAdmin,
    logout,
    appointmentAdmin,
    cancelAppointmentAdmin,
    adminDashboard
}