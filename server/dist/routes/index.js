"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const urlRouter_1 = __importDefault(require("./urlRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const authRouter_1 = __importDefault(require("./authRouter"));
const router = (0, express_1.Router)();
// the routes will prefix /api
router.use("/url", urlRouter_1.default);
router.use("/user", userRouter_1.default);
router.use("/auth", authRouter_1.default);
exports.default = router;
