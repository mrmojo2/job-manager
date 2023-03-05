import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import HttpError from '../error/HttpError.js'

const register = async (req, res) => {
    const { email, name, password } = req.body

    if (!name || !email || !password) {
        throw new HttpError('please provide all values', StatusCodes.BAD_REQUEST)
    }

    const check = await User.findOne({ email })
    if (check) {
        throw new HttpError('User with that email already exists!', StatusCodes.BAD_REQUEST)
    }
    const user = await User.create({ email, name, password })
    const token = user.createJWT()

    res.status(StatusCodes.CREATED).json({ token })
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new HttpError('please provide all values', StatusCodes.BAD_REQUEST)
    }

    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        throw new HttpError('Couldn\'t find user with that email', StatusCodes.NOT_FOUND)
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new HttpError('invalid email or password', StatusCodes.UNAUTHORIZED)
    }
    const token = user.createJWT()
    user.password = undefined

    res.status(StatusCodes.OK).json({ token })
}

const updateUser = async (req, res) => {
    const { email, name, lastname, location } = req.body
    if (!email || !name || !lastname || !location) {
        throw new HttpError('Please provide all values', StatusCodes.BAD_REQUEST)
    }
    const user = await User.findOne({ _id: req.user.userId })

    user.email = email
    user.name = name
    user.lastname = lastname
    user.location = location

    await user.save()

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({
        token
    })
}

const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId }).select('-_id -createdAt -updatedAt')
    res.json({ user, location: user.location })
}

export { login, register, updateUser, getCurrentUser }