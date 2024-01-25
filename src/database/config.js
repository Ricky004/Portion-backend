import mongoose from "mongoose"
import {DB_NAME} from "../constants/constants.js"

// connect to my mongodb databse here using mongoose
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`)
            console.log(`\n MongoDB connected !! DB HOST:
            ${connectionInstance.connection.host}`)
    } catch (err) {
        console.log("MongoDB connection error", err)
        process.exit(1)
    }
}

export {connectDB}