import validator from "validator";
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken'

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


export {
    addDoctor,
    loginAdmin,
    logout,
}