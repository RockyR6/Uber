import express from "express";
import { captainController } from "../controllers/captain.controller.js";
import { body } from "express-validator";
import { authCaptain } from "../middlewares/auth.middleware.js";

const captainRoutes = express.Router();


captainRoutes.post('/register',
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Vehicle color is required'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Vehicle plate is required'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity is required'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be car, bike or auto'),
    captainController.registerCaptain
);

captainRoutes.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    captainController.loginCaptain
)

captainRoutes.get('/profile', authCaptain, captainController.getCaptainProfile);


captainRoutes.post('/logout', authCaptain, captainController.logoutCaptain);


export default captainRoutes;