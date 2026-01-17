import BlacklistToken from "../models/blacklistToken.model.js";
import User from "../models/user.model.js";
import Captain from "../models/captain.model.js";
import jwt from 'jsonwebtoken'


export const authUser = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if(!token){
        return res.status(401).json({message: 'Access denied. No token provided.'})
    }

    const isBlacklisted = await BlacklistToken.findOne({ token });

    if(isBlacklisted){
        return res.status(401).json({message: 'Unauthorized. Token has been blacklisted.'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id)
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({message: 'Invalid token.'})
    }
}

export const authCaptain = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'Access denied. No token provided.'})
    }
    const isBlacklisted = await BlacklistToken.findOne({ token });

    if(isBlacklisted){
        return res.status(401).json({message: 'Unauthorized. Token has been blacklisted.'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await Captain.findById(decoded._id)
        req.captain = captain;
        return next();
    } catch (error) {
        return res.status(401).json({message: 'Invalid token.'})
    }
}