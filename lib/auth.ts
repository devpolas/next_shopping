// lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "./db";
import { sendEmail } from "./actions/email.actions";
import { APIError, createAuthMiddleware } from "better-auth/api";

import { z } from "zod";
import { signOut } from "./actions/auth.actions";

const emailSchema = z.email();

// Ensure environment variables exist
const {
  BETTER_AUTH_URL,
  BETTER_AUTH_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = process.env;

if (!BETTER_AUTH_URL || !BETTER_AUTH_SECRET) {
  throw new Error(
    "Missing BETTER_AUTH_URL or BETTER_AUTH_SECRET environment variables",
  );
}

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "Missing Google OAuth credentials (GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET)",
  );
}

export const auth = betterAuth({
  baseURL: BETTER_AUTH_URL,
  secret: BETTER_AUTH_SECRET,

  // Database connection using Prisma adapter
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  trustedOrigins:
    process.env.TRUSTED_ORIGINS?.split(",").map((o) => o.trim()) || [],

  // Email/password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: false,
    minPasswordLength: 6,
    sendResetPassword: async ({ user, token }) => {
      const resetUrl = new URL(
        "/reset-password",
        process.env.NEXT_PUBLIC_APP_URL || process.env.BETTER_AUTH_URL,
      );
      resetUrl.searchParams.set("token", token);
      try {
        await sendEmail({
          subject: "Reset your password",
          to: user.email,
          meta: {
            description: "Click the link below to reset your password",
            link: resetUrl.toString(),
          },
        });
      } catch {
        throw new APIError("INTERNAL_SERVER_ERROR", {
          message: "Failed to send reset email",
        });
      }
    },
    onPasswordReset: async ({ user }) => {
      // invalidate other sessions
      await signOut();

      await sendEmail({
        to: user.email,
        subject: "Password successfully reset",
        meta: {
          description:
            "Your password has been changed. If this wasn’t you, contact support immediately.",
        },
      });

      console.log(`Password for user ${user.email} has been reset.`);
    },
    onExistingUserSignUp: async ({ user }) => {
      void sendEmail({
        to: user.email,
        subject: "Sign-up attempt with your email",
        meta: {
          description:
            "Someone tried to create an account using your email address. If this was you, try signing in instead. If not, you can safely ignore this email.",
        },
      });
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const link = new URL(url);
      link.searchParams.set("callbackURL", "/dashboard");

      try {
        await sendEmail({
          subject: "Verify your email address",
          to: user.email,
          meta: {
            description:
              "Please verify your email address to complete the registration process.",
            link: link.toString(),
          },
        });
      } catch {
        throw new APIError("INTERNAL_SERVER_ERROR", {
          message: "Failed to send verification email",
        });
      }
    },
  },

  // Social login providers
  socialProviders: {
    google: {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      accessType: "offline", // get refresh tokens
      prompt: "select_account consent", // force account selection
    },
    // You can add more providers here
  },

  // Session settings
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },

  // Next.js cookies plugin
  plugins: [nextCookies()],

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/signup/email") {
        return;
      }

      const rawEmail = ctx.body?.email;

      if (!rawEmail) {
        throw new APIError("BAD_REQUEST", {
          message: "Email is required",
        });
      }
      const email = rawEmail.toLowerCase().trim();
      const parsed = emailSchema.safeParse(email);
      if (!parsed.success) {
        throw new APIError("BAD_REQUEST", {
          message: "Invalid email format",
        });
      }

      const domain = parsed.data.split("@").pop()!;
      const allowedDomainsEnv = process.env.EMAIL_DOMAIN;

      if (allowedDomainsEnv) {
        const allowedDomains = allowedDomainsEnv
          .split(",")
          .map((d) => d.trim().toLowerCase());

        if (!allowedDomains.includes(domain.toLowerCase())) {
          throw new APIError("BAD_REQUEST", {
            message: "Email domain not allowed",
          });
        }
      }
    }),
  },

  // Optional: enable debug logs in development
  debug: process.env.NODE_ENV !== "production",
});
