"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authToken_1 = require("../middlwares/authToken");
const router = (0, express_1.Router)();
router.get("/refresh-token", authToken_1.handleRefreshToken);
exports.default = router;
