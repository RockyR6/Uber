import { validationResult } from "express-validator";
import Captain from "../models/captain.model.js";
import { captainService } from "../services/captain.service.js";


 const registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const { fullname, email, password, vechicle, color, plate, capacity, vechicleType } = req.body;

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
        vechicle,
        color: vechicle.color,
        plate: vechicle.plate,
        capacity: vechicle.capacity,
        vechicleType: vechicle.vechicleType
    })
    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });
}

export const captainController = {
    registerCaptain
}