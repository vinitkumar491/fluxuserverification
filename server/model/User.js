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
    program: String, 
    issueDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);