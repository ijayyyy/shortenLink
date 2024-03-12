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
const urlModels_1 = __importDefault(require("../models/urlModels"));
const urlServices_1 = require("../services/urlServices");
const authToken_1 = require("../middlwares/authToken");
const router = (0, express_1.Router)();
router.post("/", authToken_1.verifyAccessToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { originalLink, customUrlCode } = req.body;
    if (originalLink) {
        try {
            let urlData = yield urlModels_1.default.findOne({ originalLink });
            if (urlData) {
                // URL already exists, return the existing data
                return res.status(200).json(urlData);
            }
            const generatedUrlCode = customUrlCode;
            // Generate barcode data
            const barcodeData = yield (0, urlServices_1.generateBarcode)(generatedUrlCode);
            // Create a new URL with the provided data
            const data = yield (0, urlServices_1.createUrl)(Object.assign(Object.assign({}, req.body), { userId: (_a = req["user"]) === null || _a === void 0 ? void 0 : _a.id, customUrlCode,
                barcodeData }));
            res.status(201).json(data);
        }
        catch (error) {
            console.log(error);
            res.status(500).json("Internal server error");
        }
    }
    else {
        res.status(400).json("Missing required parameters");
    }
}));
router.get("/:urlCode", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const urlCode = req.params.urlCode;
    if (!urlCode) {
        return res.status(404).send("Bad request");
    }
    try {
        const data = yield (0, urlServices_1.getUrlByUrlCode)(urlCode);
        if (!data || !data.originalLink) {
            return res.status(404).send("URL not found");
        }
        res.status(301).redirect(data.originalLink);
    }
    catch (error) {
        res.status(500).json("Internal server error");
    }
}));
router.get("/user/:userId", authToken_1.verifyAccessToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = req.params.userId;
    if (userId !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id)) {
        res.status(401).json("Access Denied");
        return;
    }
    try {
        const data = yield (0, urlServices_1.getUrlsForUser)(userId);
        if (data.length === 0) {
            return res.status(404).json("No data found for the user");
        }
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json("Internal server error");
    }
}));
router.get("/custom-code", authToken_1.verifyAccessToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customUrlCode = req.params.customUrlCode;
    try {
        const data = yield (0, urlServices_1.getCustomUrlCode)(customUrlCode);
        res.status(200).json({ data });
    }
    catch (error) {
        console.error(error);
        res.status(500).json("Internal server error");
    }
}));
router.put("/:urlCode", authToken_1.verifyAccessToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const urlCode = req.params.urlCode;
    if (!urlCode) {
        res.status(400).send("Bad request");
    }
    try {
        const udpatedData = yield (0, urlServices_1.updateAndEditUrlCode)(req.body);
        res.status(200).json(udpatedData);
    }
    catch (error) {
        res.status(500).json("Internal server error");
    }
}));
router.delete("/:urlCode", authToken_1.verifyAccessToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const urlCode = req.params.urlCode;
    if (!urlCode) {
        res.status(400).send("Bad request");
    }
    try {
        const data = yield (0, urlServices_1.deleteUrlByUrlCode)(urlCode);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json("Internal server error");
    }
}));
exports.default = router;
