import { Request, Response } from "express";
import { prismaClient } from "../utils/prismaInstance";
import {
  TypeUser,
  ZodUser,
  TypeLogin,
  ZodLogin,
  TypeUserUpdate,
  ZodUserUpdate,
} from "../utils/zodSchemas";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const addUser = async (
  req: Request<{}, {}, TypeUser>,
  res: Response<{ status: string }>
) => {
  const data = req.body;
  const checked = ZodUser.safeParse(data);
  if (checked.success) {
    let final: TypeUser;
    bcrypt.hash(data.password, 7, async (error, result) => {
      final = { ...data, password: result };
      try {
        await prismaClient.user.create({ data: final });
        res.json({ status: "ok" });
      } catch {
        res.json({ status: "error" });
      }
    });
  } else {
    res.json({ status: "error" });
  }
};

export const loginUser = async (
  req: Request<{}, {}, TypeLogin>,
  res: Response<{ status: string; token?: string }>
) => {
  const data = req.body;
  const checked = ZodLogin.safeParse(data);
  if (checked.success) {
    try {
      const findUser = await prismaClient.user.findUnique({
        where: { email: data.email },
      });
      if (findUser) {
        bcrypt.compare(data.password, findUser.password, (error, result) => {
          if (result) {
            const token = jwt.sign(
              {
                data: data.email,
              },
              process.env.JWT_SECRET!,
              { expiresIn: "1h" }
            );
            res.json({ status: "ok", token });
          } else {
            res.json({ status: "error" });
          }
        });
      } else {
        res.json({ status: "error" });
      }
    } catch {
      res.json({ status: "error" });
    }
  } else {
    res.json({ status: "error" });
  }
};

export const updateUser = async (
  req: Request<{}, {}, TypeUserUpdate>,
  res: Response<{ status: string }>
) => {
  const updatedData = req.body;
  const checked = ZodUserUpdate.safeParse(updatedData);
  if (checked.success) {
    try {
      await prismaClient.user.update({
        // @ts-ignore
        where: { id: req.params.id },
        data: updatedData,
      });
      res.json({ status: "ok" });
    } catch {
      res.json({ status: "error" });
    }
  } else {
    res.json({ status: "error" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response<{ status: string }>
) => {
  try {
    await prismaClient.user.delete({
      where: {
        // @ts-ignore
        id: req.params.id,
      },
    });
    res.json({ status: "ok" });
  } catch {
    res.json({ status: "error" });
  }
};
