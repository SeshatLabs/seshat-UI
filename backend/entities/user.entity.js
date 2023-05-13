import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userID: { type: String, unique: true },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
