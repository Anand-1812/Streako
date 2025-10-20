import express from "express";
import Habit from "../models/habit.model.js";
import { protect } from "../middlewares/auth.middleware.js";

const habitRouter = express.Router();

// Add a habit
habitRouter.post('/habits/add', protect, async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user._id;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newHabit = await Habit.create({
      userId,
      title,
      description,
      history: [],
      streak: 0,
    });

    res.status(201).json({ status: 'success', data: newHabit });
  } catch (error) {
    console.error("Error adding habit:", error);
    res.status(500).json({ error: "Habit posting internal server error" });
  }
});

// Get habits for logged-in user
habitRouter.get('/habits', protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const habits = await Habit.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ status: "success", data: habits });
  } catch (error) {
    console.error("Error fetching habits: ", error);
    res.status(500).json({ error: "Habit fetching internal error" });
  }
});

export default habitRouter;

