import * as z from "zod";

export const userSignupSchema = z
  .object({
    name: z.string().min(3).max(20),
    email: z.email("Invalid email address"),
    password: z.string().min(6).max(30),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const userSigninSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string(),
});
