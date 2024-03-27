"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["https://delicate-cocada-132c97.netlify.app"],
    methods: ["POST", "GET"]
}));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server running on port: " + port);
});
(0, db_1.default)();
app.use((req, res, next) => {
    console.log(`Route call: ${req.method} : ${req.originalUrl}`);
    next();
});
app.use("/api", routes_1.default);
exports.default = app;
