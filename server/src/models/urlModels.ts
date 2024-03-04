import mongoose from "mongoose";
import shortid from "shortid";

const UrlSchema = new mongoose.Schema({
  urlCode: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  originalLink: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  visitCount: {
    type: Number,
    default: 0,
  },
  userId: {
    type: String,
    ref: "User", // Reference to the User model
    index: true,
  },
  customUrlCode: {
    type: String,
    unique: true,
    default: shortid.generate,
  },
  barcodeData: {
    type: String,
  },
});

UrlSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default mongoose.model("urls", UrlSchema);
