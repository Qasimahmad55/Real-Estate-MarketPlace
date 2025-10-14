import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB successfully")

    } catch (error) {
        console.log("Cannot connect to the MongoDB", error)
    }
}
export { connectDb }