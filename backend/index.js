import express from "express"
import cors from "cors"
// import session from "express-session"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import ProductRoute from "../backend/routes/ProductRoute.js"
import UserRoute from "../backend/routes/UserRoute.js"
import AuthRoute from "../backend/routes/AuthRoute.js"
import jwt from "jsonwebtoken"
// import { PrismaSessionStore } from '@quixo3/prisma-session-store';
// import { PrismaClient } from "@prisma/client";

dotenv.config()
const app = express()
const port = process.env.APP_PORT



// app.use(
//     session({
//         cookie: {
//             maxAge: 7 * 24 * 60 * 60 * 1000 // ms
//         },
//         secret: process.env.SESSION_SECRET,
//         resave: false,
//         saveUninitialized: true,
//         store: new PrismaSessionStore(
//             new PrismaClient(),
//             {
//                 checkPeriod: 2 * 60 * 1000,  //ms
//                 dbRecordIdIsSessionId: true,
//                 dbRecordIdFunction: undefined,
//             }
//         )
//     })
// )

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         secure: 'auto'
//     }
// }))

app.use(cors({
    credentials: true,
    origin: process.env.APP_PORT_FRONTEND
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(AuthRoute)
app.use(ProductRoute)
app.use(UserRoute)

app.listen(port, () => {
    console.log(`Server Up and Running at http://localhost:${port}`)
})