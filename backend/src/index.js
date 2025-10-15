import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";

// connection with the databse
dotenv.config({
  path: "./.env",
});

// express
const PORT = process.env.APP_PORT || 7123
const app = express();
app.use(express.json());

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`mongoDB connection error: ${err}`);
    process.exit(1);
  })


