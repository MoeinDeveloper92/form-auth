//we need to parse the cookie here to assess the user
//we need to import cookie parse inside th eserver js
//app.user(cookieParser())
//we need to get the patyload from the token
import jwt from "jsonwebtoken"
import assyncHandler from "express-async-handler"
import { User } from "../models/userModel.js"



const protect = assyncHandler(async (req, res, next) => {
    let token;
    //whene we want to access a protected route, this function gets called
    //bellow line runs because of cookie parse
    token = req.cookies.jwt


    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //decoded object should have user id
            req.user = await User.findById(decoded.userId).select("-password")

            next()
        } catch (error) {
            res.status(401)
            throw new Error("Not Authorized, Invalid Token")
        }
    } else {
        res.status(401)
        throw new Error("Not Authorized, No Token")
    }
})


export { protect }