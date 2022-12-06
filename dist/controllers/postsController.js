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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.unlikePost = exports.likePost = exports.addPost = void 0;
const prismaInstance_1 = require("../utils/prismaInstance");
const zodSchemas_1 = require("../utils/zodSchemas");
const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = req.body;
    const checked = zodSchemas_1.ZodPost.safeParse(newPost);
    if (checked.success) {
        try {
            yield prismaInstance_1.prismaClient.post.create({ data: newPost });
            res.json({ status: "ok" });
        }
        catch (_a) {
            res.json({ status: "error" });
        }
    }
    else {
        res.json({ status: "error" });
    }
});
exports.addPost = addPost;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const targetPost = yield prismaInstance_1.prismaClient.post.findUnique({ where: { id } });
        if (targetPost === null || targetPost === void 0 ? void 0 : targetPost.likes) {
            yield prismaInstance_1.prismaClient.post.update({
                where: { id },
                data: { likes: (targetPost === null || targetPost === void 0 ? void 0 : targetPost.likes) + 1 },
            });
        }
        res.json({ status: "ok" });
    }
    catch (_b) {
        res.json({ status: "error" });
    }
});
exports.likePost = likePost;
const unlikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const targetPost = yield prismaInstance_1.prismaClient.post.findUnique({ where: { id } });
        if (targetPost === null || targetPost === void 0 ? void 0 : targetPost.likes) {
            yield prismaInstance_1.prismaClient.post.update({
                where: { id },
                data: { likes: (targetPost === null || targetPost === void 0 ? void 0 : targetPost.likes) - 1 },
            });
        }
        res.json({ status: "ok" });
    }
    catch (_c) {
        res.json({ status: "error" });
    }
});
exports.unlikePost = unlikePost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedData = req.body;
    const checked = zodSchemas_1.ZodPostUpdate.safeParse(updatedData);
    if (checked.success) {
        try {
            yield prismaInstance_1.prismaClient.post.update({
                where: { id: req.params.id },
                data: updatedData,
            });
            res.json({ status: "ok" });
        }
        catch (_d) {
            res.json({ status: "error" });
        }
    }
    else {
        res.json({ status: "error" });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prismaInstance_1.prismaClient.post.delete({
            where: {
                id: req.params.id,
            },
        });
        res.json({ status: "ok" });
    }
    catch (_e) {
        res.json({ status: "error" });
    }
});
exports.deletePost = deletePost;
