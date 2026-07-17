import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  letterNo: String,
});

export default mongoose.model("User", userSchema);