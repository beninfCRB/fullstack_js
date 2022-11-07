import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        if (!token) {
            return res.status(403).json({ message: "No token provided!" });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }

            req.username = user
            next()
        });
    } else {
        res.sendStatus(401)
    }
}