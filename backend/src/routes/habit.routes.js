import express from "express";
import Habit from "../models/habit.model.js";
import { protect } from "../middlewares/auth.middleware.js";
import { isSameDay } from "../utils/isSameDay.js";

const habitRouter = express.Router();

// Add new habit
habitRouter.post("/habits/add", protect, async (req, res) => {
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

    res.status(201).json({ status: "success", data: newHabit });
  } catch (error) {
    console.error("Error adding habit:", error);
    res.status(500).json({ error: "Habit posting internal server error" });
  }
});

// get all habit for a user
habitRouter.get("/habits", protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const habits = await Habit.find({ userId }).sort({ createdAt: -1 });

    const today = new Date();

    // Add computed property for frontend
    const updatedHabits = habits.map((habit) => {
      const todayEntry = habit.history.find((h) => isSameDay(h.date, today));
      return {
        ...habit.toObject(),
        completedToday: !!(todayEntry && todayEntry.completed),
      };
    });

    res.status(200).json({ status: "success", data: updatedHabits });
  } catch (error) {
    console.error("Error fetching habits:", error);
    res.status(500).json({ error: "Habit fetching internal error" });
  }
});

// Toggle habit status
habitRouter.patch("/habits/:id/toggle", protect, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    const today = new Date();
    const todayEntry = habit.history.find((h) => isSameDay(h.date, today));

    if (todayEntry) {
      // Toggle completion for today
      todayEntry.completed = !todayEntry.completed;

      // Adjust streak if user unmarks today's completion
      if (!todayEntry.completed) {
        habit.streak = Math.max(0, habit.streak - 1);
      }
    } else {
      // Mark today as completed
      habit.history.push({ date: today, completed: true });

      // Check yesterday for streak continuation
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const yesterdayEntry = habit.history.find((h) =>
        isSameDay(h.date, yesterday)
      );

      if (yesterdayEntry && yesterdayEntry.completed) {
        habit.streak += 1;
      } else {
        habit.streak = 1;
      }
    }

    await habit.save();
    res.status(200).json({ status: "success", data: habit });
  } catch (error) {
    console.error("Error toggling habit:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default habitRouter;

