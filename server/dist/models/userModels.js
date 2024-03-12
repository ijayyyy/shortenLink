"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model("users", UserSchema);
