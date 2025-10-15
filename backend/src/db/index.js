import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongoDB connection successful");

  } catch (error) {
    console.log(`MongoDB connection failed: ${error}`);
  }
}

export default connectDB;
