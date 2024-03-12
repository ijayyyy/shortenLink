"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.SESSION_SECRET = void 0;
require("dotenv").config();
exports.SESSION_SECRET = process.env.SESSION_SECRET;
exports.JWT_SECRET = process.env.JWT_SECRET;
