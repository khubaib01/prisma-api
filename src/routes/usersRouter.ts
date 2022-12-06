import { Router } from "express";
import {
  addUser,
  deleteUser,
  loginUser,
  updateUser,
} from "../controllers/usersController";

export const usersRouter = Router();

usersRouter
  .post("/", addUser)
  .post("/login", loginUser)
  .patch("/:id", updateUser)
  .delete("/:id", deleteUser);
