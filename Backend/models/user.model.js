import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
    {
        username:
        {
            type: String,
            required: true,
            unique: true,
        },
        email:
        {
            type: String,
            required: true,
            unique: true,
        },
        password:
        {
            type: String,
            required: true,
        },
        avatar:
        {
            type: String,
            default: "https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
        }

    },
    {
        timestamps: true
    }
)
const User = mongoose.model("user", userSchema)
export default User