"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userServices_1 = require("../services/userServices");
const userModels_1 = __importDefault(require("../models/userModels"));
const authToken_1 = require("../middlwares/authToken");
const router = (0, express_1.Router)();
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //validate email format
    const payload = req.body;
    if (!payload.email || !payload.fullName || !payload.password) {
        res.status(400).json("Missing required parameter");
    }
    else {
        try {
            const existingUser = yield userModels_1.default.findOne({ email: payload.email });
            if (existingUser) {
                res.status(401).json("Email address not available!");
            }
            else {
                const user = yield (0, userServices_1.createUser)(payload);
                req["user"] = user;
                (0, authToken_1.getAuthToken)(req, res);
            }
        }
        catch (error) {
            res.status(500).json("Internal server error");
        }
    }
}));
router.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    if (!payload.email || !payload.password) {
        res.status(400).json("Missing required parameter");
    }
    else {
        const userData = yield (0, userServices_1.logInUser)(payload);
        if (typeof userData === "object" && userData.email) {
            req["user"] = userData;
            (0, authToken_1.getAuthToken)(req, res);
        }
        else {
            res.status(403).json("Invalid email/password");
        }
    }
}));
router.get("/:userId", authToken_1.verifyAccessToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    if (!userId) {
        res.status(400).send("Bad request");
    }
    const user = yield (0, userServices_1.getUserById)(userId);
    res.status(200).json(user);
}));
router.put("/:userId", authToken_1.verifyAccessToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = req.params.userId;
    if (!userId) {
        res.status(400).send("Bad request");
    }
    if (userId !== ((_a = req["user"]) === null || _a === void 0 ? void 0 : _a.id)) {
        res.status(403).send("Unauthorized");
    }
    try {
        const udpatedData = yield (0, userServices_1.updateUser)(userId, req.body);
        res.status(200).json(udpatedData);
    }
    catch (error) {
        res.status(500).json("Internal server error");
    }
}));
exports.default = router;
