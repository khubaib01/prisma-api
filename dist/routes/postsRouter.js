"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const postsController_1 = require("../controllers/postsController");
exports.postsRouter = (0, express_1.Router)();
exports.postsRouter
    .post("/", postsController_1.addPost)
    .patch("/:id", postsController_1.updatePost)
    .patch("/like/:id", postsController_1.likePost)
    .patch("/unlike/:id", postsController_1.unlikePost)
    .delete("/:id", postsController_1.deletePost);
