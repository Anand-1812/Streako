import mongoose, { Schema } from "mongoose";

const habitSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  streak: {
    type: Number,
    default: 0,
  },
  history: {
    date: { type: Date },
    completed: { type: Boolean, default: false },
  },
}, { timestamps: true });

const Habit = mongoose.model('habit', userSchema);
export default Habit;


