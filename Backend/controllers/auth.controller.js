import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'
export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const hashedPassword = await bcryptjs.hash(password, 10)
        const user = await User.create(
            {
                username,
                email,
                password: hashedPassword
            }
        )
        res
            .status(201)
            .json(
                {
                    data: user,
                    msg: "User created successfully"
                }
            )
    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) return next(errorHandler(404, 'User not found'))
        const validPassword = await bcryptjs.compare(password, validUser.password)
        if (!validPassword) return next(errorHandler(404, 'Invalid Password'))
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET)
        const { password: pass, ...rest } = validUser._doc
        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest)
    } catch (error) {
        next(error)
    }
}
export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign(
                {
                    id: user._id
                },
                process.env.JWT_SECRET
            )
            const { password: pass, ...rest } = user._doc
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest)
        }
        else {
            const generatedPassword = Math.random().toString(36).slice(-8)
            const hashedPassword = await bcryptjs.hash(generatedPassword, 10)
            const user = await User.create(
                {
                    username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                    email: req.body.email,
                    password: hashedPassword,
                    avatar: req.body.photo
                }
            )
            const token = jwt.sign(
                {
                    id: user._id
                },
                process.env.JWT_SECRET
            )
            const { password: pass, ...rest } = user._doc
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest)
        }
    } catch (error) {
        next(error)
    }
}