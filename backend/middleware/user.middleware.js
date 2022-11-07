import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const checkUser = async (req, res, next) => {
    try {
        let user = await prisma.user.findFirst({
            where: {
                username: req.body.username
            }
        })
        if (user) return res.status(400).json({ msg: 'Gagal! Username Sudah Ada' })

        user = await prisma.user.findFirst({
            where: {
                email: req.body.email
            }
        })
        if (user) return res.status(400).json({ msg: 'Gagal! Email Sudah Ada' })

        next()
    } catch (error) {
        return res.sendStatus(500)
    }
}

export const isAdmin = async (req, res, next) => {
    const refreshToken = req.cookies.refresh_token

    try {
        const roles = await prisma.user.findFirst({
            where: {
                refresh_token: refreshToken
            }
        })

        if (roles.role === 'admin') {
            next()
        }

        return res.sendStatus(403)
    } catch (error) {
        return res.sendStatus(403)
    }
}

export const isManager = async (req, res, next) => {
    const refreshToken = req.cookies.refresh_token

    try {
        const roles = await prisma.user.findFirst({
            where: {
                refresh_token: refreshToken
            }
        })

        if (roles.role === 'manager') {
            next()
        }

        return res.sendStatus(403)
    } catch (error) {
        return res.sendStatus(403)
    }
}
export const isAdminOrManager = async (req, res, next) => {
    const refreshToken = req.cookies.refresh_token

    try {
        const roles = await prisma.user.findFirst({
            where: {
                refresh_token: refreshToken
            }
        })

        if (roles.role === 'admin') {
            next()
        }

        if (roles.role === 'manager') {
            next()
        }

        return res.sendStatus(403)
    } catch (error) {
        return res.sendStatus(403)
    }
}