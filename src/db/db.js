import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongodb connnected")
    } catch (error) {
         console.error("Mongodb connection failed")
         process.exit(1);
         // since DB connection failed
    }
}

export default connectDB;