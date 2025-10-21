import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import habitRouter from "./routes/habit.routes.js";

// connection with the databse
dotenv.config({
  path: "./.env",
});

// initialize express
const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
  res.send("backend is running")
})
app.use('/home', userRouter);
app.use('/home', habitRouter)

const PORT = process.env.APP_PORT || 7123

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
});


