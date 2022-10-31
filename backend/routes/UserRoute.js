import express from "express"
import {body,validationResult} from "express-validator"

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    validator
} from "../controllers/UserController.js"

const router = express.Router()

router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.post('/users',validator('createUser'),createUser)
router.patch('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

export default router