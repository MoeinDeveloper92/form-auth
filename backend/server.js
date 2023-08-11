import express from 'express'
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRoutes from "../backend/routes/userRoutes.js"
import { notFound, errorHandler } from "../backend/middleware/errorMiddleware.js"
import connectDB from './config/db.js'
import path from "path"
import { dirname } from "path"
import { fileURLToPath } from 'url'
dotenv.config()
const PORT = process.env.PORT || 5000
connectDB()
const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
//it allows us to parse raw json
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use("/api/users", userRoutes)

//Server Frontend
if (process.env.NODE_ENV === "production") {
    //we need to set our static folder which is build folder
    //__dirname is the current directory
    app.use(express.static(path.join(__dirname, "../frontend/build")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html"))
    })
} else {
    app.get("/", (req, res) => {
        res.send("Plesae set the mode on Production")
    })
}


app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`The app is running on the port ${PORT}`)
})