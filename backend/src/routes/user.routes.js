import express from "express";
import User from "../models/user.model.js";
import { randomBytes, createHmac } from "crypto";
import jwt from "jsonwebtoken";
import { protect } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

// Helper: generate JWT
const generateToken = (user) => {
  try {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (err) {
    console.error("JWT Generation Error:", err.message);
    throw err;
  }
};

// USER SIGNUP
userRouter.post("/signup", async (req, res) => {
  console.log("\n[POST] /signup");
  try {
    const { name, email, password } = req.body;
    console.log("Incoming signup data:", { name, email });

    if (!name || !email || !password) {
      console.log("Missing fields in signup");
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", email);
      return res
        .status(400)
        .json({ error: `User with email ${email} already exists.` });
    }

    const salt = randomBytes(16).toString("hex");
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    console.log("Password hashed successfully.");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      salt,
    });
    console.log("User created successfully:", user._id);

    const token = generateToken(user);
    console.log("JWT generated for new user.");

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      status: "success",
      message: "Signup successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Signup Error Trace:", error.message, error.stack);
    res.status(500).json({ error: "Internal server error" });
  }
});

// USER LOGIN
userRouter.post("/login", async (req, res) => {
  console.log("\n[POST] /login");
  try {
    const { email, password } = req.body;
    console.log("Login attempt with email:", email);

    if (!email || !password) {
      console.log("Missing login fields.");
      return res.status(400).json({ error: "Email and password required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(404).json({ error: "User not found." });
    }

    const hashedPassword = createHmac("sha256", user.salt)
      .update(password)
      .digest("hex");

    if (hashedPassword !== user.password) {
      console.log("Invalid password for user:", email);
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = generateToken(user);
    console.log("Login token generated.");

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log("Cookie set successfully.");

    res.status(200).json({
      status: "success",
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login Error Trace:", error.message, error.stack);
    res.status(500).json({ error: "Internal server error" });
  }
});

// VERIFY PERSISTENT LOGIN
userRouter.get("/verify", protect, (req, res) => {
  console.log("[GET] /verify - Authenticated user:", req.user.email);
  res.status(200).json({
    status: "success",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
});

// LOGOUT
userRouter.post("/logout", (req, res) => {
  console.log("[POST] /logout");
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  res
    .status(200)
    .json({ status: "success", message: "Logged out successfully." });
});

// GET ALL USERS
userRouter.get("/users", async (req, res) => {
  console.log("[GET] /users");
  try {
    const users = await User.find().select("-password -salt");
    res.status(200).json({ status: "success", data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default userRouter;

