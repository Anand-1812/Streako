import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import habitRouter from "./routes/habit.routes.js";

// Load environment variables
dotenv.config({ path: "./.env" });

// Initialize express
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS setup
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Debug middleware
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Routes
app.use("/home", userRouter);
app.use("/home", habitRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

// Port
const PORT = process.env.APP_PORT || 7123;

// Start server
connectDB()
  .then(() => {
    console.log("MongoDB connection successful");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Allowed origins: ${allowedOrigins.join(", ")}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });

