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

const router = express.Router()

router.get('/products', getProducts)
router.get('/products/:id', getProductById)
router.post('/products',validation(),validate,createProduct)
router.patch('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

export default router