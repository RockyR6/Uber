import express from "express";
import { captainController } from "../controllers/captain.controller.js";
import { body } from "express-validator";

const captainRoutes = express.Router();


captainRoutes.post('/register',
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vechicle.color').isLength({ min: 3 }).withMessage('Vechicle color is required'),
    body('vechicle.plate').isLength({ min: 3 }).withMessage('Vechicle plate is required'),
    body('vechicle.capacity').isInt({ min: 1 }).withMessage('Vechicle capacity is required'),
    body('vechicle.vechicleType').isIn(['car', 'bike', 'auto']).withMessage('Vechicle type must be car, bike or auto'),
    captainController.registerCaptain
);

export default captainRoutes;