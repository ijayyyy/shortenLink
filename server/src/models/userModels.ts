import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },

  createdAt: {
    type: String,
    default: Date.now(),
  },

  avatar: {
    type: String,
    default: "",
  },

  updatedAt: {
    type: String,
    default: Date.now(),
  },
  refreshToken: {
    type: String,
    default: "",
  },
});
UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
export default mongoose.model("users", UserSchema);
