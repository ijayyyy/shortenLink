"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const port = process.env.PORT;
const dbConnect = () => {
    mongoose_1.default
        .connect(process.env.MONGO_CONNECTION_STRING)
        .then(() => {
        console.log("Mongoose connected");
    })
        .catch(console.error);
};
exports.default = dbConnect;
