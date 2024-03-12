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
exports.updateUser = exports.getUserById = exports.logInUser = exports.createUser = void 0;
const userModels_1 = __importDefault(require("../models/userModels"));
const hash_1 = require("../util/hash");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //hash passsword
        const user = yield userModels_1.default.create(Object.assign(Object.assign({}, payload), { password: (0, hash_1.createHash)(payload.password) }));
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.createUser = createUser;
const logInUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModels_1.default.findOne({ email: payload.email });
        if (!user)
            return false;
        //compare passwords
        const passswordMatch = (0, hash_1.compareHash)(payload.password, user.password);
        if (!passswordMatch) {
            return false;
        }
        return user;
    }
    catch (error) {
        throw new Error("something is wrong");
    }
});
exports.logInUser = logInUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModels_1.default.findById(id);
    if (!user)
        throw new Error("User does not exist");
    return {
        id: user.id,
        fullName: user.fullName,
        avatar: user.avatar,
        email: user.email,
    };
});
exports.getUserById = getUserById;
const updateUser = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield userModels_1.default.findById(userId);
        if (!data) {
            throw new Error("User not found");
        }
        // Editable column restriction
        const editableColumns = ["fullName", "avatar"];
        // Update the fields specified in the payload
        editableColumns.forEach((key) => {
            if (payload[key] !== undefined) {
                // Check for undefined before updating
                data[key] = payload[key];
            }
        });
        // Save the updated document
        yield data.save();
        return "updated";
    }
    catch (error) {
        console.log(error);
        throw error; // Rethrow the error
    }
});
exports.updateUser = updateUser;
