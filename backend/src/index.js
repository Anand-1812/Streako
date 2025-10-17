import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import userRouter from "./routes/user.routes.js";

// connection with the databse
dotenv.config({
  path: "./.env",
});

// initialize express
const app = express();
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("backend is running")
})
app.use('/home', userRouter);

const PORT = process.env.APP_PORT || 7123

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
});


