import mongoose from "mongoose"
import validator from "validator"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'pleaase provide name'],
        maxLength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'pleaase provide email'],
        // match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please provide valid email'],
        validate: {
            validator: validator.isEmail,    //don't invoke pass by reference
            message: 'Please provide a valid email',
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        minLength: [6, 'password must be at least 6 characters long'],
        select: false
    },
    lastname: {
        type: String,
        maxLength: 20,
        default: 'lastName',
        trim: 'true'
    },
    location: {
        type: String,
        maxLength: 20,
        default: 'myCity',
        trim: 'true'
    },


}, { timestamps: true })

//note: this is triggered by Model.save() but not by Model.findOneAndUpdate()
UserSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return

    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_KEY, { expiresIn: process.env.JWT_LIFETIME })
}

UserSchema.methods.comparePassword = async function (submittedPassword) {
    const isMatch = await bcrypt.compare(submittedPassword, this.password)
    return isMatch
}

export default mongoose.model('User', UserSchema)