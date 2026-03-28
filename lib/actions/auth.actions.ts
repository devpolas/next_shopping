"use server";

import * as z from "zod";
import { userSigninSchema, userSignupSchema } from "../validators/user-schema";
import { auth } from "../auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// ================= TYPES =================

type AuthResult = {
  success: boolean;
  message: string;
  redirectTo?: string;
};

type BetterAuthError = {
  body?: {
    code?: string;
    message?: string;
  };
};

// ================= HELPERS =================

async function getHeaders() {
  return await headers();
}

function isBetterAuthError(error: unknown): error is BetterAuthError {
  return typeof error === "object" && error !== null && "body" in error;
}

// ================= SIGNUP =================

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
      message: "Password doesn't match",
    };
  }

  try {
    await auth.api.signUpEmail({
      body: { name, email, password },
      headers: await getHeaders(),
    });

    return {
      success: true,
      message: "Account created. Please verify your email.",
      redirectTo: `/verify-account?email=${encodeURIComponent(email)}`,
    };
  } catch (error: unknown) {
    console.error("SIGNUP ERROR:", error);

    if (isBetterAuthError(error)) {
      return {
        success: false,
        message: error.body?.message || "Signup failed",
      };
    }

    return {
      success: false,
      message: "Unexpected error occurred",
    };
  }
}

// ================= SIGNIN =================

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
      message: "Login successful",
    };
  } catch (error: unknown) {
    console.error("SIGNIN ERROR:", error);

    if (isBetterAuthError(error)) {
      // ✅ HANDLE UNVERIFIED EMAIL
      if (error.body?.code === "EMAIL_NOT_VERIFIED") {
        try {
          await auth.api.sendVerificationEmail({
            body: { email },
          });
        } catch {
          // ignore resend failure
        }

        return {
          success: false,
          message: "Email not verified. Verification link sent again.",
          redirectTo: `/verify-account?email=${encodeURIComponent(email)}`,
        };
      }

      return {
        success: false,
        message: error.body?.message || "Signin failed",
      };
    }

    return {
      success: false,
      message: "Unexpected error occurred",
    };
  }
}

// ================= GOOGLE LOGIN =================

export async function continueWithGoogle(): Promise<AuthResult> {
  try {
    const result = await auth.api.signInSocial({
      body: {
        provider: "google",
      },
      headers: await getHeaders(),
    });

    return {
      success: true,
      message: "Redirecting to Google...",
      redirectTo: result.url,
    };
  } catch (error: unknown) {
    console.error("GOOGLE SIGNIN ERROR:", error);

    return {
      success: false,
      message: "Google authentication failed",
    };
  }
}

// ================= SIGNOUT =================

export async function signOut(): Promise<AuthResult> {
  try {
    const res = await auth.api.signOut({
      headers: await getHeaders(),
    });

    if (res.success) {
      redirect("/signin");
    }

    return {
      success: true,
      message: "Logged out",
      redirectTo: "/signin",
    };
  } catch {
    return {
      success: false,
      message: "Failed to sign out",
    };
  }
}

// ================= SESSION =================

export async function session() {
  const res = await auth.api.getSession({
    headers: await getHeaders(),
  });

  return res?.user ?? null;
}

// ================= FORGOT PASSWORD =================

export async function forgotPassword(data: { email: string }) {
  try {
    const result = await auth.api.requestPasswordReset({
      body: {
        email: data.email,
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
      },
    });

    return { success: true, data: result };
  } catch (error: unknown) {
    console.error("FORGOT PASSWORD ERROR:", error);

    return {
      success: false,
      error: "Failed to send reset link",
    };
  }
}

// ================= RESET PASSWORD =================

export async function resetPassword(data: { password: string; token: string }) {
  try {
    const result = await auth.api.resetPassword({
      body: {
        newPassword: data.password,
        token: data.token,
      },
    });

    return { success: true, data: result };
  } catch (error: unknown) {
    console.error("RESET PASSWORD ERROR:", error);

    return {
      success: false,
      error: "Failed to reset password",
    };
  }
}

// ================= RESEND VERIFICATION =================

export async function sendVerificationEmail(email: string) {
  try {
    const result = await auth.api.sendVerificationEmail({
      body: { email },
    });

    return { success: true, data: result };
  } catch (error: unknown) {
    console.error("VERIFY EMAIL ERROR:", error);

    return {
      success: false,
      error: "Failed to send verification email",
    };
  }
}
