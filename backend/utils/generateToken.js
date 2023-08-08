import jwt from "jsonwebtoken"


//creating token
const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

    //once we have created the token we should store it inside the cookie
    res.cookie("jwt", token, {
        httpOnly: true,
        //for the secure the site has to be https
        secure: process.env.NODE_ENV === "production",
        //this prevents CFR attack
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
}




export default generateToken