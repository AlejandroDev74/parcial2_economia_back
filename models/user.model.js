import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    fechanac: {
      type: String,
      required: true,
    },
    identificacion: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    celular: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    perfil: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
