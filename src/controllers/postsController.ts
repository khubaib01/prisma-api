import { Request, Response } from "express";
import { prismaClient } from "../utils/prismaInstance";
import {
  TypePost,
  TypePostUpdate,
  ZodPost,
  ZodPostUpdate,
} from "../utils/zodSchemas";

export const addPost = async (
  req: Request<{}, {}, TypePost>,
  res: Response<{ status: string }>
) => {
  const newPost = req.body;
  const checked = ZodPost.safeParse(newPost);
  if (checked.success) {
    try {
      await prismaClient.post.create({ data: newPost });
      res.json({ status: "ok" });
    } catch {
      res.json({ status: "error" });
    }
  } else {
    res.json({ status: "error" });
  }
};

export const likePost = async (
  req: Request<{ id: string }>,
  res: Response<{ status: string }>
) => {
  const id = req.params.id;
  try {
    const targetPost = await prismaClient.post.findUnique({ where: { id } });
    if (targetPost?.likes) {
      await prismaClient.post.update({
        where: { id },
        data: { likes: targetPost?.likes + 1 },
      });
    }
    res.json({ status: "ok" });
  } catch {
    res.json({ status: "error" });
  }
};

export const unlikePost = async (
  req: Request<{ id: string }>,
  res: Response<{ status: string }>
) => {
  const id = req.params.id;
  try {
    const targetPost = await prismaClient.post.findUnique({ where: { id } });
    if (targetPost?.likes) {
      await prismaClient.post.update({
        where: { id },
        data: { likes: targetPost?.likes - 1 },
      });
    }
    res.json({ status: "ok" });
  } catch {
    res.json({ status: "error" });
  }
};

export const updatePost = async (
  req: Request<{ id: string }, {}, TypePostUpdate>,
  res: Response<{ status: string }>
) => {
  const updatedData = req.body;
  const checked = ZodPostUpdate.safeParse(updatedData);
  if (checked.success) {
    try {
      await prismaClient.post.update({
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

export const deletePost = async (
  req: Request<{ id: string }>,
  res: Response<{ status: string }>
) => {
  try {
    await prismaClient.post.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json({ status: "ok" });
  } catch {
    res.json({ status: "error" });
  }
};
