"use server";

import * as z from "zod";
import { userSignupSchema } from "../validators/user-schema";
import { auth } from "../auth";
import { headers } from "next/headers";

type AuthResult = {
  success: boolean;
  message: string;
};

export async function signup(
  data: z.infer<typeof userSignupSchema>,
): Promise<AuthResult> {
  const parsed = userSignupSchema.safeParse(data);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0];

    return {
      success: false,
      message: firstError?.message || "Invalid input",
    };
  }

  const { name, email, password } = parsed.data;

  try {
    const response = await auth.api.signUpEmail({
      body: { name, email, password },
      asResponse: true,
      headers: await headers(),
    });

    if (!response.ok) {
      const errorData = await response.json();

      return {
        success: false,
        message: errorData?.message || "Signup failed",
      };
    }

    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Unexpected error occurred during signup",
    };
  }
}
