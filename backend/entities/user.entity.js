import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from 'crypto';

//TODO: for now we are usng auth0 to handle auth, but in future we can use this entity as well
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  apiKey: String,
  role: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAPIKEY = function () {
  // Generate a random API key using 32 bytes of data and encode it as a hex string
  const apiKey = crypto.randomBytes(32).toString("hex");
  this.apiKey = apiKey;
};

const User = mongoose.model("User", userSchema);
export default User;
