import express from "express"

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    validation
} from "../controllers/user.controller.js"
import { validate } from "../middleware/validator.middleware.js"
import { verifyToken } from "../middleware/auth.middleware.js"
import { isAdmin } from "../middleware/user.middleware.js"

const router = express.Router()

router.get('/users', verifyToken, getUsers)
router.get('/users/:id', verifyToken, getUserById)
router.post('/users', validation(), validate, createUser)
router.patch('/users/:id', validation(), verifyToken, validate, updateUser)
router.delete('/users/:id', verifyToken, deleteUser)

export default router