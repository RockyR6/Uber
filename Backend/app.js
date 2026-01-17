import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectToDb from './db/db.js'
import userRoutes from './Routes/user.route.js'
import cookieParser from 'cookie-parser'
import captainRoutes from './Routes/captain.route.js'


connectToDb()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())



app.get('/', (_, res) => {
    res.send('Hello World')
});

app.use('/users', userRoutes)
app.use('/captains', captainRoutes)

export default app;