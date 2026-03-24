import * as z from "zod";

export const userSignupSchema = z.object({
  name: z
    .string()
    .min(3, "Full name at least 3 characters")
    .max(20, "Full name max 20 characters or less"),
  email: z.email(),
  password: z
    .string()
    .min(6, "Password must be 6 characters")
    .max(30, "Password less than 30 characters"),
  confirmPassword: z
    .string()
    .min(6, "Password must be 6 characters")
    .max(30, "Password less than 30 characters"),
});

export const userSigninSchema = z.object({
  email: z.email(),
  password: z.string(),
});
