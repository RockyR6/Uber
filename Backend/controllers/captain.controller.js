import { validationResult } from "express-validator";
import Captain from "../models/captain.model.js";
import { captainService } from "../services/captain.service.js";
import BlacklistToken from "../models/blacklistToken.model.js";


 const registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const { fullname, email, password, vehicle, color, plate, capacity, vehicleType } = req.body;

    const isCaptainExist = await Captain.findOne({ email });
    if(isCaptainExist){
        return res.status(400).json({ message: 'Captain with this email already exists' });
    }

    const hashedPassword = await Captain.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        vehicle,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    })
    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });
}

const loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const { email, password } = req.body;
    const captain = await Captain.findOne({ email }).select('+password');
    if(!captain){
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await captain.comparePassword(password);
    if(!isPasswordValid){
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = captain.generateAuthToken();
    res.cookie('token', token)
    res.json({ token, captain });
}

const getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
} 

const logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await BlacklistToken.create({ token });

    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
}





export const captainController = {
    registerCaptain,
    loginCaptain,
    getCaptainProfile,
    logoutCaptain
}