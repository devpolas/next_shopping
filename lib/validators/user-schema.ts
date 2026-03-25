import * as z from "zod";

export const userSignupSchema = z
  .object({
    name: z
      .string("fullname is required")
      .min(3, "fullname minimum 3 characters")
      .max(20, "fullname maximum 20 characters or less"),
    email: z.email("Invalid email address"),
    password: z
      .string("Password is Required")
      .min(6, "password minimum 6 characters long")
      .max(30, "password maximum 30 characters or less"),
    confirmPassword: z.string("Confirm Password is Required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const userSigninSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
