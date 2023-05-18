import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userID: { type: String, unique: true, required: true },
  revenue: { type: Number, required: true },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
