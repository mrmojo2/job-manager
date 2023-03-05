import { StatusCodes } from 'http-status-codes'
import HttpError from '../error/HttpError.js'
import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization || !authorization.startsWith('Bearer')) {
        throw new HttpError('authentication invalid', StatusCodes.UNAUTHORIZED)
    }
    const token = authorization.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_KEY)
        req.user = { userId: payload.userId }
        next()
    } catch (error) {
        throw new HttpError('authentication invalid', StatusCodes.UNAUTHORIZED)
    }

}

export default auth