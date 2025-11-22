import express from 'express'
const app = express()
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDb } from './connectDb.js'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import cors from 'cors'
// import path from 'path'
app.use(cors(
    {
        origin: 'https://real-estate-market-place-ipq7.vercel.app'
    }
))
dotenv.config(
    {
        path: './.env'
    }
)
connectDb()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/listing", listingRouter)


app.listen(3000 || process.env.PORT, () => {
    console.log("Server is running at 3000");
})
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500
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


// const __dirname = path.resolve()
// app.use(express.static(path.join(__dirname, 'Frontend', 'dist')))
//     app.get('/*', (req, res) => {
//         res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'))
//     })