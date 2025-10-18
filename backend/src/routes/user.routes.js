import express from "express";
import User from "../models/user.model.js";
import { randomBytes, createHmac } from "crypto";
import { generateToken } from "../utils/jwt.js";
import { protect } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

// signup route
userRouter.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // check for existing user
  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    return res.status(400)
      .json({ error: `User with email ${email} already exists` });
  }

  // hash the password
  const salt = randomBytes(256).toString('hex');
  const hashedPassword = createHmac('sha256', salt)
    .update(password)
    .digest('hex');

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    salt,
  });

  const token = generateToken(user);
  res.cookie("token", token,
    { httpOnly: true, secure: false, sameSite: "lax", path: "/" }
  );

  return res.status(201)
    .json({ status: 'success', data: { id: user._id, name: user.name, email: user.email } });
});

userRouter.get("/users", async (req, res) => {
  try {
    const users = await User.findOne();

    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get the logged in user
userRouter.get("/user", protect, async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: {
        name: req.user.name,
        email: req.user.email
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default userRouter;
