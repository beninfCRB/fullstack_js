import express from "express"
import {body,validationResult} from "express-validator"

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    validation
} from "../controllers/UserController.js"
import { validate } from "../middleware/validator.js"

const router = express.Router()

router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.post('/users',validation(),validate,createUser)
router.patch('/users/:id',validation(),validate,updateUser)
router.delete('/users/:id', deleteUser)

export default router