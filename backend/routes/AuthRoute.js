import express from "express"

import {
    me,
    login,
    logout,
    validation
} from "../controllers/AuthController.js"
import { refreshToken } from "../controllers/ResreshToken.js"
import { validate } from "../middleware/validator.js"

const router = express.Router()

router.get('/me', me)
router.post('/login', validation(), validate, login)
router.delete('/logout', logout)
router.get('/token', refreshToken)

export default router