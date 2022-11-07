import express from "express"
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    validation
} from "../controllers/product.controller.js"
import { validate } from "../middleware/validator.middleware.js"
import { verifyToken } from "../middleware/auth.middleware.js"
import { isAdmin } from "../middleware/user.middleware.js"

const router = express.Router()

router.get('/products', verifyToken, isAdmin, getProducts)
router.get('/products/:id', verifyToken, isAdmin, getProductById)
router.post('/products', validation(), verifyToken, isAdmin, validate, createProduct)
router.patch('/products/:id', validation(), verifyToken, isAdmin, validate, updateProduct)
router.delete('/products/:id', verifyToken, isAdmin, deleteProduct)

export default router