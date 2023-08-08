import express from 'express'
import dotenv from "dotenv"

dotenv.config()
const PORT = process.env.PORT || 5000

const app = express()
app.get("/", (req, res) => {
    res.send("Server is Ready")
})

app.listen(PORT, () => {
    console.log(`The app is running on the port ${PORT}`)
})