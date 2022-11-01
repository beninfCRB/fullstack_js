import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv"
import bcrypt from "bcrypt";
import { body } from "express-validator";
import jwt from "jsonwebtoken"

dotenv.config()
const prisma = new PrismaClient()

export const login = async (req, res) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                username: req.body.username
            }
        })
        if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan" })

        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) return res.status(400).json({ msg: "Password Salah" })
        const id = user.id
        const username = user.username
        const email = user.email
        const role = user.role
        const accessToken = jwt.sign({ id, username, email, role }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        })

        const refreshToken = jwt.sign({ id, username, email, role }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })

        console.log(refreshToken)

        await prisma.user.update({
            where: {
                id
            },
            data: {
                refresh_token: accessToken
            }
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: false
        })

        res.status(200).json({ accessToken })
    } catch (error) {
        res.status(404).json({ msg: "User Tidak Ditemukan" })
    }
}

export const me = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ msg: "Mohon Login Terlebih Dahulu" })
        }

        const user = await prisma.user.findFirst({
            where: {
                id: req.session.userId
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true
            }
        })
        if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan" })

        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ msg: "User Tidak Ditemukan" })
    }
}

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ msg: "Tidak Dapat Logout" })
        res.status(200).json({ msg: "Anda telah Logout" })
    })
}

export const validation = () => {
    return [
        body('username').exists().isString().withMessage('Username is not empty'),
        body('password').exists().isString().withMessage('Password is not empty')
    ]
}