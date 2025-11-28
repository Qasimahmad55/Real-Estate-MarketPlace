import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000, // 10 seconds timeout
        });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        if (error.name === 'MongoServerSelectionError' && error.message.includes('timed out')) {
            console.error("MongoDB connection timed out after 10000ms. Please check your network or database server.");
        } else {
            console.error("Cannot connect to MongoDB:", error);
        }
    }
}
export { connectDb }