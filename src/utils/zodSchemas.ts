import { z } from "zod";

export const ZodUser = z.object({
  email: z.string().min(1).email({ message: "Must be a valid email" }),
  handle: z.string(),
  password: z.string().min(5),
});

export const ZodUserUpdate = z.object({
  email: z.string().optional(),
  handle: z.string().optional(),
  password: z.string().optional(),
});

export const ZodPost = z.object({
  title: z.string(),
  content: z.string(),
  tags: z.string(),
  authorId: z.string(),
});

export const ZodPostUpdate = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  tags: z.string().optional(),
  published: z.boolean().optional(),
});

export const ZodLogin = z.object({
  email: z.string(),
  password: z.string(),
});

export type TypeUser = z.TypeOf<typeof ZodUser>;
export type TypePost = z.TypeOf<typeof ZodPost>;
export type TypeUserUpdate = z.TypeOf<typeof ZodUserUpdate>;
export type TypePostUpdate = z.TypeOf<typeof ZodPostUpdate>;
export type TypeLogin = z.TypeOf<typeof ZodLogin>;
