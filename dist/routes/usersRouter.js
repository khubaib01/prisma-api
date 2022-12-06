"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter
    .post("/", usersController_1.addUser)
    .post("/login", usersController_1.loginUser)
    .patch("/:id", usersController_1.updateUser)
    .delete("/:id", usersController_1.deleteUser);
