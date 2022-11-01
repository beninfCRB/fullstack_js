import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { body } from "express-validator";
import jwt from "jsonwebtoken"

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
            expiresIn: '5m'
        })

        const refreshToken = jwt.sign({ id, username, email, role }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })

        const token = JSON.stringify(String(refreshToken))

        await prisma.user.update({
            where: {
                id
            },
            data: {
                refresh_token: token
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
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.sendStatus(204)

        const user = await prisma.user.findFirst({
            where: {
                refresh_token: `"${refreshToken}"`
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

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(204)

    const user = await prisma.user.findFirst({
        where: {
            refresh_token: `"${refreshToken}"`
        }
    })

    if (!user) return res.sendStatus(204)

    const id = user.id

    await prisma.user.update({
        where: {
            id: id
        },
        data: {
            refresh_token: null
        }
    })

    res.clearCookie('refreshToken')
    return res.status(200).json({ msg: "Berhasil Logout" })
}

export const validation = () => {
    return [
        body('username').exists().isString().withMessage('Username is not empty'),
        body('password').exists().isString().withMessage('Password is not empty')
    ]
}