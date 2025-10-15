import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

// connection with the databse
dotenv.config()

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDb connected."))
  .catch(err => console.log(`Error: ${err}`))



