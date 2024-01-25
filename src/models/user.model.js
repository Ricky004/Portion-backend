import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// email regexp to validate email, it's right format or not
const emailRegExpPatterns = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

// user schema 
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(value) {
                return emailRegExpPatterns.test(value)
            },
            message: "Pls provide a right email address"
        },
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {  
        type: String, // cloudinary url
        required: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, "Password must be at least 6 characters"]
    },
    refreshToken: {
        type: String,
    },
}, { timestamps: true })

// this method use to encryction our password before save in db 
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// this method use to compare user given password is correct or wrong
userSchema.methods.isPasswordCorrect = async function
    (password) {
    return await bcrypt.compare(password, this.password)
}

// this method use to generate access tokens  
userSchema.methods.generateAccessToken = function
    () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

// this method use to generate refresh tokens
userSchema.methods.generateRefreshToken = function
    () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

export const User = mongoose.model("User", userSchema)
