import express from "express";
import User from "../models/user.model.js";
import { randomBytes, createHmac } from "crypto";

const userRouter = express();

// signup route
userRouter.post('/signup', async (req, res) => {
  const {name, email, password} = req.body;

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

  const user = await User.insertOne({
    name,
    email,
    password: hashedPassword,
    salt,
  });

  return res.status(201)
    .json({ status: 'success', data: { id: user._id } });
});

export default userRouter;
