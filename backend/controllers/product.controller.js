import { PrismaClient } from "@prisma/client"
import { body } from "express-validator"
const prisma = new PrismaClient()

export const getProducts = async (req, res) => {
    try {
        const response = await prisma.product.findMany()
        return res.sendStatus(200).json(response)
    } catch (error) {
        return res.sendStatus(500).json({ msg: error.message })
    }
}

export const getProductById = async (req, res) => {
    try {
        const response = await prisma.product.findFirst({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const createProduct = async (req, res) => {
    const { name, price } = req.body
    try {
        const product = await prisma.product.create({
            data: {
                name: name,
                price: price
            }
        })
        res.status(201).json(product)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const updateProduct = async (req, res) => {
    const { name, price } = req.body
    try {
        const product = await prisma.product.update({
            where: {
                id: req.params.id
            },
            data: {
                name: name,
                price: price
            }
        })
        res.status(201).json(product)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await prisma.product.delete({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const validation = () => {
    return [
        body('name').exists().isString().withMessage('Name is not empty'),
        body('price').exists().isCurrency().withMessage('Price is not empty')
    ]
}