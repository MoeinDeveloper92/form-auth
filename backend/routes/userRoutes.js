import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import {
    authUSer,
    updateUserProfile,
    getUserProfile,
    logoutUser,
    registerUser
} from "../controllers/userController.js"

const router = express.Router()

router.route("/auth").post(authUSer)
router.route("/").post(registerUser)
router.route("/logout").post(logoutUser)
router.route("/profile").get(protect, getUserProfile)
router.route("/profile").put(protect, updateUserProfile)




export default router