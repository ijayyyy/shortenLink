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
exports.deleteUrlByUrlCode = exports.getCustomUrlCode = exports.getUrlsForUser = exports.updateAndEditUrlCode = exports.generateBarcode = exports.getUrlByUrlCode = exports.createUrl = void 0;
const shortid_1 = __importDefault(require("shortid"));
const bwip_js_1 = __importDefault(require("bwip-js"));
const urlModels_1 = __importDefault(require("../models/urlModels"));
const createUrl = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // validate here
    if (!payload.originalLink || !payload.userId) {
        throw Error("Missing required options");
    }
    try {
        let url = new urlModels_1.default(payload);
        // If a custom URL code is provided, use it; otherwise, generate one using shortid
        if (payload.customUrlCode) {
            url.urlCode = payload.customUrlCode;
        }
        else {
            let isCodeUnique = false;
            let generatedUrlCode;
            // Loop until a unique URL code is generated
            while (!isCodeUnique) {
                generatedUrlCode = shortid_1.default.generate();
                // Check if the generated code is unique
                const existingUrl = yield urlModels_1.default.findOne({ urlCode: generatedUrlCode });
                isCodeUnique = !existingUrl;
            }
            url.urlCode = generatedUrlCode;
            const barcodeData = yield (0, exports.generateBarcode)(url.urlCode); // Use the URL code or any other data you want in the barcode
            url.barcodeData = barcodeData;
        }
        url = yield url.save();
        return url;
    }
    catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
});
exports.createUrl = createUrl;
const getUrlByUrlCode = (urlCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield urlModels_1.default.findOne({ urlCode });
        if (!data)
            throw Error("Bad request");
        data.visitCount = data.visitCount + 1;
        return yield urlModels_1.default.findOneAndUpdate({ urlCode: urlCode }, data, {
            new: true,
        });
    }
    catch (error) {
        console.log(error);
        Error();
    }
});
exports.getUrlByUrlCode = getUrlByUrlCode;
const generateBarcode = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        bwip_js_1.default.toBuffer({
            bcid: "code128",
            text: data,
            scale: 3,
            height: 20,
            includetext: true,
        }, (err, png) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(`data:image/png;base64,${png.toString("base64")}`);
            }
        });
    });
});
exports.generateBarcode = generateBarcode;
const updateAndEditUrlCode = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.urlCode)
        throw Error("Invalid urlCode");
    try {
        const existingUrl = yield urlModels_1.default.findOne({ urlCode: payload.urlCode });
        if (!existingUrl) {
            throw Error("URL not found");
        }
        // Editable column restriction
        const editableColumns = ["name", "originalLink"];
        // Update the fields specified in the payload
        editableColumns.forEach((key) => {
            if (payload[key] !== undefined) {
                // Check for undefined before updating
                existingUrl[key] = payload[key];
            }
        });
        // Save the updated document
        const updatedUrl = yield existingUrl.save();
        return updatedUrl;
    }
    catch (error) {
        console.log(error);
        throw error; // Rethrow the error to propagate it
    }
});
exports.updateAndEditUrlCode = updateAndEditUrlCode;
const getUrlsForUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urls = yield urlModels_1.default.find({ userId: userId }).exec();
        console.log("urls:", urls);
        return urls;
    }
    catch (error) {
        throw new Error("Internal servers error");
    }
});
exports.getUrlsForUser = getUrlsForUser;
const getCustomUrlCode = (customUrlCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customUrls = yield urlModels_1.default.find({ customUrlCode: customUrlCode });
        if (!customUrls || customUrls.length === 0) {
            throw new Error("Custom URL not found");
        }
        return customUrls;
    }
    catch (error) {
        throw new Error("Internal servers error");
    }
});
exports.getCustomUrlCode = getCustomUrlCode;
const deleteUrlByUrlCode = (urlCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield urlModels_1.default.deleteOne({ urlCode });
        return "Deleted successfully";
    }
    catch (error) {
        console.log(error);
        Error();
    }
});
exports.deleteUrlByUrlCode = deleteUrlByUrlCode;
