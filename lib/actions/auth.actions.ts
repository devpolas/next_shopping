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

async function getHeaders() {
  return await headers();
}

export async function signup(
  data: z.infer<typeof userSignupSchema>,
): Promise<AuthResult> {
  const parsed = userSignupSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid input",
    };
  }

  const { name, email, password, confirmPassword } = parsed.data;

  if (password !== confirmPassword) {
    return {
      success: false,
      message: "password doesn't match",
    };
  }

  try {
    await auth.api.signUpEmail({
      body: { name, email, password },
      headers: await getHeaders(),
    });

    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error) {
    console.error("SIGNUP ERROR:", error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Signup failed",
    };
  }
}

export async function signin(
  data: z.infer<typeof userSigninSchema>,
): Promise<AuthResult> {
  const parsed = userSigninSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid input",
    };
  }

  const { email, password } = parsed.data;

  try {
    await auth.api.signInEmail({
      body: { email, password },
      headers: await getHeaders(),
    });

    return {
      success: true,
      message: "User login successfully",
    };
  } catch (error) {
    console.error("SIGNIN ERROR:", error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Signin failed",
    };
  }
}

export async function continueWithGoogle(): Promise<void> {
  const result = await auth.api.signInSocial({
    body: {
      provider: "google",
      callbackURL: "/",
    },
    headers: await getHeaders(),
  });

  if (result.url) {
    redirect(result.url);
  }

  throw new Error("Google auth failed");
}

export async function signOut(): Promise<void> {
  await auth.api.signOut({ headers: await getHeaders() });
  redirect("/signin");
}

export async function session() {
  const res = await auth.api.getSession({ headers: await getHeaders() });
  return res?.user ?? null;
}

export async function forgotPassword(data: { email: string }) {
  try {
    const result = await auth.api.requestPasswordReset({
      body: {
        email: data.email,
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
      },
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("Forgot password failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Forgot password failed",
    };
  }
}

export async function resetPassword(data: {
  password: string;
  token?: string;
}) {
  try {
    const result = await auth.api.resetPassword({
      body: {
        newPassword: data.password,
        token: data.token,
      },
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("Reset password failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Reset password failed",
    };
  }
}
