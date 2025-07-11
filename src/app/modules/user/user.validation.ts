import z from "zod";
import { IsActive, Role } from "./user.interface";

const createUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(5, { message: "Min 5 characters" })
    .max(50, { message: "Name too long" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Must include at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Must include at least one lowercase letter" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Must include at least one special character",
    }),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const updateUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(5, { message: "Min 5 characters" })
    .max(50, { message: "Name too long" })
    .optional(),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Must include at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Must include at least one lowercase letter" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Must include at least one special character",
    })
    .optional(),
  role: z.enum(Object.values(Role) as [string]),
  phone: z.string().optional(),
  address: z
    .string()
    .max(200, { message: "Maximum word count 200" })
    .optional(),
  picture: z.string().optional(),
  isDeleted: z.boolean().optional(),
  isActive: z.enum(Object.values(IsActive) as [string]).optional(),
  isVerified: z.boolean().optional(),
});

export const userValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
