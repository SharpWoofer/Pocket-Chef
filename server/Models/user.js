import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    default: "",
  },
  activities: {
    type: String,
    default: "",
  },
  height: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "",
  },
  goals: {
    type: String,
    default: "",
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  age: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
export default User;
