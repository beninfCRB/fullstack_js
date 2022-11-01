import express from "express"

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    validation
} from "../controllers/UserController.js"
import { validate } from "../middleware/validator.js"
import { verifyToken } from "../middleware/VerifyToken.js"

const router = express.Router()

router.get('/users', verifyToken, getUsers)
router.get('/users/:id', verifyToken, getUserById)
router.post('/users', validation(), verifyToken, validate, createUser)
router.patch('/users/:id', validation(), verifyToken, validate, updateUser)
router.delete('/users/:id', verifyToken, deleteUser)

export default router