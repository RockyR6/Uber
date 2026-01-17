import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [ 3, 'First name must be at least 3 characters long ' ]
        },
        lastname: {
            type: String,
            minlength: [ 3, 'Last name must be at least 3 characters long ' ]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'please use a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: [ 8, 'Password must be at least 8 characters long' ]
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['available', 'unavailable', 'on-trip'],
        default: 'unavailable'
    },
    vechicle: {
        color: { 
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long']
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate must be at least 3 characters long']
        },
       capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1']
       },
       vechicleType: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto',]
       }
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
})  


//Generate auth token method
captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
    return token;
};

//Compare password method
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

//Hash password static method
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const Captain = mongoose.models.Captain || mongoose.model('Captain', captainSchema)

export default Captain;