import mongoose, { Schema, trusted } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import crypto from "crypto"

const userSchema = new Schema({
    avatar: {
        type: {
            url: String,
            localpath: String
        },
        default: {
            url: `https://placehold.co/600x400`,
            localpath: ""
        }
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    fullname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    idEmalVerified: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: {
        type: String,
    },
    emailVerificationToken: {
        type: String,
    },
    forgotPasswordExpiry: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    emailVerificationExpry: {
        type: Date
    },

}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next();
})

userSchema.methods.idPasswordCorrect = async function (password) {
    await bcrypt.compare(password, this.password);
}
userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },

    );
}

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },

    );
}

userSchema.methods.generateTemporaryBytesToken = function () {
    const unHashedToken = crypto.randomBytes(20).toString("hex")
    const hashedToken = crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex")

    const tokenExpiry = Date.now() + (20 * 60 * 1000) // 20 min

    return { hashedToken, unHashedToken, tokenExpiry }
}

export const User = mongoose.model("User", userSchema)