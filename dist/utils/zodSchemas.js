"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodLogin = exports.ZodPostUpdate = exports.ZodPost = exports.ZodUserUpdate = exports.ZodUser = void 0;
const zod_1 = require("zod");
exports.ZodUser = zod_1.z.object({
    email: zod_1.z.string().min(1).email({ message: "Must be a valid email" }),
    handle: zod_1.z.string(),
    password: zod_1.z.string().min(5),
});
exports.ZodUserUpdate = zod_1.z.object({
    email: zod_1.z.string().optional(),
    handle: zod_1.z.string().optional(),
    password: zod_1.z.string().optional(),
});
exports.ZodPost = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    tags: zod_1.z.string(),
    authorId: zod_1.z.string(),
});
exports.ZodPostUpdate = zod_1.z.object({
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
    tags: zod_1.z.string().optional(),
    published: zod_1.z.boolean().optional(),
});
exports.ZodLogin = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
