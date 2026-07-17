import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    letterNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    email: String,
    phone: Number,
    program: String, // e.g. "Web Development Bootcamp" - optional, shown if present
    issueDate: Date, // optional, shown if present
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);