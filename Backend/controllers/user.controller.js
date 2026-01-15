import User from '../models/user.model.js'
import {userService} from '../services/user.service.js'
import { validationResult } from 'express-validator'
import BlacklistToken from '../models/blacklistToken.model.js'


//user registration controller
const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const { fullname, email, password } = req.body;

    const hashedPassword = await User.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    })

    const token = user.generateAuthToken();

    res.status(201).json({ token, user })
}

//user login controller
const loginUser = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if(!user){
        return  res.status(401).json({message: 'Invalid email or password'})
    }

    const isPasswordValid = await user.comparePassword(password);

    if(!isPasswordValid){
        return  res.status(401).json({message: 'Invalid email or password'})
    }
    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, user });
}

//user profile controller
const getUserProfile = async (req, res, next) => {

    res.status(200).json(req.user)
}

//user logout controller
const logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.header('Authorization')?.split(' ', [ 1 ]);
    await BlacklistToken.create({ token });
    res.status(200).json({message: 'Logged out successfully'})
}

export const userController = {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
}