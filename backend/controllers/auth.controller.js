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

        const _User = {
            id: user.id,
            username: user.username,
            role: user.role,
            email: user.email
        }

        const accessToken = jwt.sign({ _User }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h'
        })

        const refreshToken = jwt.sign({ _User }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1h'
        })

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                refresh_token: refreshToken
            }
        })

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: false
        })

        res.status(200).json({ accessToken })
    } catch (error) {
        res.sendStatus(404).json({ msg: error })
    }
}

export const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refresh_token
    try {
        if (!refreshToken) return res.sendStatus(401)

        const user = await prisma.user.findFirst({
            where: {
                refresh_token: refreshToken
            }
        })

        if (!user) return res.sendStatus(403)

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)

            const _User = {
                id: user.id,
                username: user.username,
                role: user.role,
                email: user.email
            }

            const accessToken = jwt.sign({ _User }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1h'
            })
            res.status(200).json({ accessToken })
        })
    } catch (error) {
        console.log(error)
    }
}

export const me = async (req, res) => {
    const refreshToken = req.cookies.refresh_token
    try {
        if (!refreshToken) return res.sendStatus(204)

        const user = await prisma.user.findFirst({
            where: {
                refresh_token: refreshToken
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
        res.sendStatus(404).json({ msg: "User Tidak Ditemukan" })
    }
}

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refresh_token
    try {
        if (!refreshToken) return res.sendStatus(204)
        const user = await prisma.user.findFirst({
            where: {
                refresh_token: refreshToken
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

        res.clearCookie('refresh_token')
        return res.status(200).json({ msg: "Berhasil Logout" })
    } catch (error) {

    }
}

export const validation = () => {
    return [
        body('username').exists().isString().withMessage('Username is not empty'),
        body('password').exists().isString().withMessage('Password is not empty')
    ]
}