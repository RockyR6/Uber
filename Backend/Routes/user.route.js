import express from 'express'
import { body } from 'express-validator'
import {userController} from '../controllers/user.controller.js'
import { authUser } from '../middlewares/auth.middleware.js'

const router = express.Router();

// register user route
router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 charecters long'),
    body('password').isLength({min: 6}).withMessage('Password  must be at least 6 charecters long')

],
    userController.registerUser
)

// login user route
router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('Password  must be at least 6 charecters long')
],
    userController.loginUser
)

//user profile route
router.get('/profile',authUser, userController.getUserProfile)

//user logout route
router.post('/logout', authUser, userController.logoutUser)








export default router