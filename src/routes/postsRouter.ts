import { Router } from "express";
import {
  addPost,
  deletePost,
  likePost,
  unlikePost,
  updatePost,
} from "../controllers/postsController";

export const postsRouter = Router();

postsRouter
  .post("/", addPost)
  .patch("/:id", updatePost)
  .patch("/like/:id", likePost)
  .patch("/unlike/:id", unlikePost)
  .delete("/:id", deletePost);
