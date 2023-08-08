import asyncHandler from "express-async-handler"
import { User } from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"
//@desc auth user/set token
//@route POST /api/users/auth
//@access Public
const authUSer = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    //get user by email
    const user = await User.findOne({ email })

    if (user && (await user.matchPasswords(password))) {
        generateToken(res, user._id)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(401)
        throw new Error("Invalid Email or password")
    }

})

//@desc register a new User
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body

    //check if the user exist
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error("User Already Exist")
    }
    //create user
    //password has gets done in userModel
    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error("Invalid User Data")
    }

})


//@desc logout user
//@route POST /api/users/logout
//@access Public
const logoutUser = asyncHandler(async (req, res, next) => {
    //for the log out you just need to destory the cookie
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),

    })
    res.status(200).json({
        message: "user has been logged out"
    })
})


//@desc Get User Profiel
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res, next) => {
    //this is the authorized user
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user)
})


//@desc Update User Profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name ? req.body.name : user.name
        user.email = req.body.email ? req.body.email : user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        })
    } else {
        res.status(404)
        throw new Error("User not Found")
    }

})


export {
    authUSer,
    logoutUser,
    getUserProfile,
    registerUser,
    updateUserProfile
}