import express from "express"
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    validation
} from "../controllers/ProductController.js"
import { validate } from "../middleware/validator.js"
import { verifyToken } from "../middleware/VerifyToken.js"

const router = express.Router()

router.get('/products', verifyToken, getProducts)
router.get('/products/:id', verifyToken, getProductById)
router.post('/products', validation(), verifyToken, validate, createProduct)
router.patch('/products/:id', validation(), verifyToken, validate, updateProduct)
router.delete('/products/:id', verifyToken, deleteProduct)

export default router