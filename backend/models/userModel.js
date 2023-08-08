import mongoose from 'mongoose'
import bcrypt from "bcryptjs"
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add name"]
    },
    email: {
        type: String,
        required: [true, "Please add email field"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add password field"]
    }
}, {
    timestamps: true
})

//we add a hook for pre/ before
//we wont use arrow funciton beacuse it is the way this ketword works
userSchema.pre("save", async function (next) {
    //this pertains to the user we are saving 
    //when we say user.create or user.save we call this this:)
    if (!this.isModified('password')) {
        next()
    }
    //if password is modified like we are creating it
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

//enetered password is the palin text passowrd
userSchema.methods.matchPasswords = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
const User = mongoose.model("User", userSchema)
export { User }