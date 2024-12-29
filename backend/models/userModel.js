import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required: true
    },
    email:{
        type : String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYZzKkJnDp03NBkjm4MssF6i5ypfKeH6XKjw&s'
    },
    address: {
        type: Object,
        default:{
            line1: '',
            line2: ''
        }
    },
    gender:{
        type: String,
        default:'Not selected'
    },
    dob:{
        type:String,
        default: 'Not Selected'
    },
    phone: {
        type: Number,
        default: '0000000000'
    }
})

const userModel = mongoose.model('users',userSchema)

export default userModel;