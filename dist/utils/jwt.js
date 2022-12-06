"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtVerify = (req, res, next) => {
    var _a;
    const providedToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    jsonwebtoken_1.default.verify(providedToken || "", process.env.JWT_SECRET, (error, decoded) => {
        if (!error) {
            next();
        }
        else {
            res.json({ status: "error", message: "Not Authorized" });
        }
    });
};
exports.jwtVerify = jwtVerify;
