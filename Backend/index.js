import express from 'express'
const app = express()
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDb } from './connectDb.js'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
dotenv.config(
    {
        path: "./.env"
    }
)
connectDb()

app.use(express.json())
app.use(cookieParser())
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/listing", listingRouter)
app.listen(3000, () => {
    console.log("Server is running at 3000");
})
app.use((error, req, res, next) => {
    const statusCode = error.statusCode
    const message = error.message
    return res
        .status(statusCode)
        .json(
            {
                success: false,
                message,
                statusCode
            }
        )
})

