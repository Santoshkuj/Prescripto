import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from 'razorpay'
import {config} from 'dotenv'
config()

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body.userDetails;

    if (!name || !password || !email) {
      return res.status(400).json({
        success: false,
        message: "Provide all details",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Provide a valid email",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Enter a strong password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("userToken", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });

    res.status(201).json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User dose not exist",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.cookie("userToken", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      });

      res.status(201).json({
        success: true,
        token,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("userToken", {
      httpOnly: true,
      secure: true,
      maxAge: 0,
    });
    res.status(200).json({
      success: true,
      message: "logout successfull",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");

    res.status(200).json({
      success: true,
      userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!userId || !name || !phone || !address || !dob || !gender) {
      return res.status(400).json({
        success: false,
        message: "Provide all details",
      });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      const imageURL = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.status(200).json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// const bookAppointment = async (req, res) => {
//   try {
//     const { userId, docId, slotDate, slotTime } = req.body;
//     const docData = await doctorModel.findById(docId).select("-password");
//     if (!docData.available) {
//       return res.status(400).json({
//         success: false,
//         message: "doctor not available",
//       });
//     }
//     let slots_booked = docData.slots_booked;

//     if (slots_booked[slotDate]) {
//       if (slots_booked[slotDate].includes(slotTime)) {
//         return res.status(400).json({
//           success: false,
//           message: "slot not available",
//         });
//       } else {
//         slots_booked[slotDate].push(slotTime);
//       }
//     } else {
//       slots_booked[slotDate] = [];
//       slots_booked[slotDate].push(slotTime);
//     }
//     const userData = await userModel.findById(userId).select("-password");
//     delete docData.slots_booked;

//     const appointment = {
//       userId,
//       docId,
//       userData: userData.toObject(),
//       docData: docData.toObject(),
//       amount: docData.fees,
//       slotDate,
//       slotTime,
//       date: Date.now(),
//     };
//     const newAppointment = new appointmentModel(appointment);
//     await newAppointment.save();

//     await doctorModel.findByIdAndUpdate(docId, { slots_booked });

//     res.status(200).json({
//       success: true,
//       message: "Appointment Booked",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");
    await doctorModel.updateMany(
      { slots_booked: { $type: "array" } },
      { $set: { slots_booked: {} } }
    );
    if (!docData.available) {
      return res.status(400).json({
        success: false,
        message: "Doctor not available",
      });
    }

    // Check if the slot is already booked
    if (
      docData.slots_booked?.[slotDate] &&
      docData.slots_booked[slotDate].includes(slotTime)
    ) {
      return res.status(400).json({
        success: false,
        message: "Slot not available",
      });
    }

    // Update the doctor's slots_booked field atomically
    const update = {};
    if (docData.slots_booked?.[slotDate]) {
      update[`slots_booked.${slotDate}`] = [
        ...docData.slots_booked[slotDate],
        slotTime,
      ];
    } else {
      update[`slots_booked.${slotDate}`] = [slotTime];
    }

    const updatedDocData = await doctorModel
      .findByIdAndUpdate(docId, { $set: update }, { new: true })
      .select("-password -slots_booked");

    const userData = await userModel.findById(userId).select("-password");

    const appointment = {
      userId,
      docId,
      userData: userData.toObject(),
      docData: updatedDocData.toObject(),
      amount: updatedDocData.fees,
      slotDate,
      slotTime,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointment);
    await newAppointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment Booked",
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId });

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData.userId !== userId) {
      return res.status(400).json({
        success: false,
        message: "Unautherised action",
      });
    }
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

const razorpayInstance = new razorpay({
  key_id : process.env.RAZORPAY_KEY_ID,
  key_secret : process.env.RAZORPAY_KEY_SECRET
})

const paymentRazorpay = async (req,res) => {
  try {
    const {appointmentId} = req.body
  const appointmentData = await appointmentModel.findById(appointmentId)

  if (!appointmentData || appointmentData.cancelled) {
    return res.status(400).json({
      success: false,
      message: "Appointment cancelled or not found",
    });
  }

  const options = {
    amount : appointmentData.amount,
    currency: 'INR',
    receipt: appointmentId
  }
  //creation of order
  const order = await razorpayInstance.orders.create(options)

  res.status(200).json({
    success:true,
    order
  })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const verifyRazorPay = async (req,res) => {
  try {
    const {razorpay_order_id} = req.body
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    if (orderInfo.status === 'paid') {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment : true})
      res.status(200).json({
        success: true,
        message: 'Payment Successfull'
      })
    } else {
      res.status(400).json({
        success: true,
        message: 'Payment failed'
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export {
  registerUser,
  loginUser,
  logout,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorPay
};
