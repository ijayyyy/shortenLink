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
exports.handleRefreshToken = exports.verifyAccessToken = exports.getAuthToken = exports.generateRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_1 = require("../util/secret");
const userModels_1 = __importDefault(require("../models/userModels"));
const generateAccessToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign({
        email: user.email,
        isLoggedIn: true,
        id: user.id,
    }, secret_1.JWT_SECRET, {
        expiresIn: "2hrs",
    });
});
const generateRefreshToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const token = jsonwebtoken_1.default.sign({
        email: user.email,
    }, secret_1.JWT_SECRET, {
        expiresIn: "1d",
    });
    user.refreshToken = token;
    yield userModels_1.default.findOneAndUpdate({ email: user.email }, user);
    return token;
});
exports.generateRefreshToken = generateRefreshToken;
const getAuthToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req["user"];
        // Await the generation of the access token
        const accessToken = yield generateAccessToken(user);
        const refreshToken = yield (0, exports.generateRefreshToken)(user);
        res
            .status(200)
            .json({ email: user.email, accessToken, refreshToken, isLoggedIn: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getAuthToken = getAuthToken;
const verifyAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = ((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "")) || "";
    try {
        if (!token || typeof token !== "string") {
            return res.status(403).send("Access denied: Invalid token format");
        }
        jsonwebtoken_1.default.verify(token, secret_1.JWT_SECRET, function (err, decoded) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (err) {
                        // Handle JWT verification error
                        console.error(err);
                        return res.status(403).send("Access denied: Invalid token");
                    }
                    if (!decoded || typeof decoded !== "object" || !decoded.email) {
                        // Handle the case where 'decoded' is undefined, not an object, or does not have 'email'
                        return res.status(403).send("Access denied: Invalid token payload");
                    }
                    const user = yield userModels_1.default.findOne({ email: decoded.email });
                    if (!user) {
                        return res.status(403).send("Access denied: User not found");
                    }
                    req["user"] = user;
                    next();
                }
                catch (dbError) {
                    console.error(dbError);
                    res.status(500).send("Internal server error");
                }
            });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});
exports.verifyAccessToken = verifyAccessToken;
const handleRefreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refresh_token = req.headers["refresh_token"] || "";
    if (!refresh_token) {
        return res.status(401).send({ message: "Invalid refresh token" });
    }
    //verify the refresh token
    try {
        const decodedRefreshToken = jsonwebtoken_1.default.verify(refresh_token, secret_1.JWT_SECRET);
        if (!decodedRefreshToken) {
            return res.status(401).send({ message: "Invalid refresh token" });
        }
        //check the refreshToken exist in user
        const user = yield userModels_1.default.findOne({ email: decodedRefreshToken.email });
        if (!user) {
            return res.status(401).send({ message: "User not found" });
        }
        if (user.refreshToken !== refresh_token) {
            return res.status(401).send({ message: "Invalid refresh token" });
        }
        // generate access token
        const accessToken = generateAccessToken(user);
        const refreshToken = yield (0, exports.generateRefreshToken)(user);
        return res.status(200).json({
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        return res.status(401).send({ message: error });
    }
});
exports.handleRefreshToken = handleRefreshToken;
