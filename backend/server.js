import express from 'express'
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRoutes from "../backend/routes/userRoutes.js"
import { notFound, errorHandler } from "../backend/middleware/errorMiddleware.js"
import connectDB from './config/db.js'

dotenv.config()
const PORT = process.env.PORT || 5000
connectDB()
const app = express()


//it allows us to parse raw json
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use("/api/users", userRoutes)
app.get("/", (req, res) => {
    res.send("Server is Ready")
})

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`The app is running on the port ${PORT}`)
})