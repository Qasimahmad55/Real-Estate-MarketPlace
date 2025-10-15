import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
export const signup = async (req, res) => {
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
        res.json({
            error: error.message
        })
    }
}