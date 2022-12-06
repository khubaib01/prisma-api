"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usersRouter_1 = require("./routes/usersRouter");
const postsRouter_1 = require("./routes/postsRouter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/users", usersRouter_1.usersRouter);
app.use("/posts", postsRouter_1.postsRouter);
app.get("/", (req, res) => {
    res.json({ message: "Server Running" });
});
app.listen(process.env.PORT || 5000);
