import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const salt = await bcrypt.genSalt(10)
export const hashedPassword = await bcrypt.hash(hashedPassword, salt)
