import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcrypt from 'bcryptjs'
const testRoute = (req, res) => {
    res.json(
        {
            msg: "Hello world"
        }
    )
}
const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account"))
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar
                }
            },
            {
                new: true
            },
        )
        // const { password, ...rest } = updatedUser._doc
        res
            .status(200)
            .json(updatedUser)
    } catch (error) {
        next(error)
    }
}

export { testRoute, updateUser }