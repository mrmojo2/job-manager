import express from "express";
const router = express.Router()

import { login, register, updateUser, getCurrentUser } from "../controllers/authController.js";
import authMiddleware from "../middlewares/atuh.js";

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/updateUser').patch(authMiddleware, updateUser)
router.route('/getUser').get(authMiddleware, getCurrentUser)

export default router