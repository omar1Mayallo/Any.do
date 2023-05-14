import mongoose from "mongoose";

//__________CREATE_TASK_SCHEMA_____________//

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Task is required"],
      minlength: [3, "Task name minimum length 3 characters"],
      maxlength: [30, "Task name maximum length 30 characters"],
    },
    notes: {
      type: String,
      trim: true,
      lowercase: true,
      minlength: [3, "Task name minimum length 3 characters"],
      maxlength: [200, "Task name maximum length 200 characters"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true],
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
