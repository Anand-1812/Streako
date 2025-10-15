import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import express from "express";

// connection with the databse
dotenv.config();

// express
const PORT = process.env.APP_PORT || 7123
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDb connected."))
  .catch(err => console.log(`Error: ${err}`))

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
})


