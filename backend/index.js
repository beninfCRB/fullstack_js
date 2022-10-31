import express from "express"
import cors from "cors"
import session from "express-session"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import ProductRoute from "../backend/routes/ProductRoute.js"
import UserRoute from "../backend/routes/UserRoute.js"
dotenv.config()

const app = express()
const port = process.env.APP_PORT

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        secure: 'auto'
    }
}))

app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(ProductRoute)
app.use(UserRoute)

app.listen(port,()=>{
    console.log(`Server Up and Running at http://localhost:${port}`)
})