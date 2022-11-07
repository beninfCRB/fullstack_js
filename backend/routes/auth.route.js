import express from "express"
import {
    me,
    login,
    logout,
    validation
} from "../controllers/auth.controller.js"
import { refreshToken } from "../controllers/auth.controller.js"
import { validate } from "../middleware/validator.middleware.js"

const router = express.Router()

router.get('/me', me)
router.post('/login', validation(), validate, login)
router.delete('/logout', logout)
router.get('/token', refreshToken)

export default router