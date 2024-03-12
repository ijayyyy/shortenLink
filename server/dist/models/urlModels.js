"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const shortid_1 = __importDefault(require("shortid"));
const UrlSchema = new mongoose_1.default.Schema({
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
        ref: "User",
        index: true,
    },
    customUrlCode: {
        type: String,
        unique: true,
        default: shortid_1.default.generate,
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
exports.default = mongoose_1.default.model("urls", UrlSchema);
