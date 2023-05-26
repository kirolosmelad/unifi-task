import { Schema, model } from "mongoose";
import { TaskAttributes } from "../../types/interfaces";

const taskSchema = new Schema<TaskAttributes>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Task = model<TaskAttributes>("Task", taskSchema);
