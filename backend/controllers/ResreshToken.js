import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken

        if (refreshToken) {
            const user = await prisma.user.findFirst({
                where: {
                    refresh_token: `"${refreshToken}"`
                }
            })

            if (!user) return res.sendStatus(403)

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.sendStatus(403)
                const id = user.id
                const username = user.username
                const email = user.email
                const role = user.role
                const accessToken = jwt.sign({ id, username, email, role }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '5m'
                })
                res.json({ accessToken })
            })
        } else {
            res.sendStatus(401)
        }
    } catch (error) {
        res.sendStatus(401)
    }
}