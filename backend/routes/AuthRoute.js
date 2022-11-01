import express from "express"

import {
    me,
    login,
    logout,
    validation
} from "../controllers/AuthController.js"
import { validate } from "../middleware/validator.js"

const router = express.Router()

router.get('/me', me)
router.post('/login', validation(), validate, login)
router.delete('/logout', logout)

export default router