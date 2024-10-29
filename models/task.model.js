import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: true,
      unique: true,
    },
    estado: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
