import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const jwtVerify = (req: Request, res: Response, next: NextFunction) => {
  const providedToken = req.headers.authorization?.split(" ")[1];
  jwt.verify(providedToken || "", process.env.JWT_SECRET!, (error, decoded) => {
    if (!error) {
      next();
    } else {
      res.json({ status: "error", message: "Not Authorized" });
    }
  });
};
