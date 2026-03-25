"use server";

import * as z from "zod";
import { userSigninSchema, userSignupSchema } from "../validators/user-schema";
import { auth } from "../auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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

export async function signin(
  data: z.infer<typeof userSigninSchema>,
): Promise<AuthResult> {
  const parsed = userSigninSchema.safeParse(data);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0];

    return {
      success: false,
      message: firstError?.message || "Invalid input",
    };
  }

  const { email, password } = parsed.data;

  try {
    const response = await auth.api.signInEmail({
      body: { email, password },
      asResponse: true,
      headers: await headers(),
    });

    if (!response.ok) {
      const errorData = await response.json();

      return {
        success: false,
        message: errorData?.message || "Signin failed",
      };
    }

    return {
      success: true,
      message: "User login successfully",
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
      message: "Unexpected error occurred during signin",
    };
  }
}

export async function signOut(): Promise<void> {
  await auth.api.signOut({ headers: await headers() });
  redirect("/signin");
}

export async function session() {
  return auth.api.getSession({ headers: await headers() });
}
