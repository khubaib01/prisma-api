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
exports.deleteUser = exports.updateUser = exports.loginUser = exports.addUser = void 0;
const prismaInstance_1 = require("../utils/prismaInstance");
const zodSchemas_1 = require("../utils/zodSchemas");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const checked = zodSchemas_1.ZodUser.safeParse(data);
    if (checked.success) {
        let final;
        bcrypt_1.default.hash(data.password, 7, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
            final = Object.assign(Object.assign({}, data), { password: result });
            try {
                yield prismaInstance_1.prismaClient.user.create({ data: final });
                res.json({ status: "ok" });
            }
            catch (_a) {
                res.json({ status: "error" });
            }
        }));
    }
    else {
        res.json({ status: "error" });
    }
});
exports.addUser = addUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const checked = zodSchemas_1.ZodLogin.safeParse(data);
    if (checked.success) {
        try {
            const findUser = yield prismaInstance_1.prismaClient.user.findUnique({
                where: { email: data.email },
            });
            if (findUser) {
                bcrypt_1.default.compare(data.password, findUser.password, (error, result) => {
                    if (result) {
                        const token = jsonwebtoken_1.default.sign({
                            data: data.email,
                        }, process.env.JWT_SECRET, { expiresIn: "1h" });
                        res.json({ status: "ok", token });
                    }
                    else {
                        res.json({ status: "error" });
                    }
                });
            }
            else {
                res.json({ status: "error" });
            }
        }
        catch (_b) {
            res.json({ status: "error" });
        }
    }
    else {
        res.json({ status: "error" });
    }
});
exports.loginUser = loginUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedData = req.body;
    const checked = zodSchemas_1.ZodUserUpdate.safeParse(updatedData);
    if (checked.success) {
        try {
            yield prismaInstance_1.prismaClient.user.update({
                // @ts-ignore
                where: { id: req.params.id },
                data: updatedData,
            });
            res.json({ status: "ok" });
        }
        catch (_c) {
            res.json({ status: "error" });
        }
    }
    else {
        res.json({ status: "error" });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prismaInstance_1.prismaClient.user.delete({
            where: {
                // @ts-ignore
                id: req.params.id,
            },
        });
        res.json({ status: "ok" });
    }
    catch (_d) {
        res.json({ status: "error" });
    }
});
exports.deleteUser = deleteUser;
