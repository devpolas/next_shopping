// lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { nextCookies } from "better-auth/next-js";

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

  // Email/password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // set to true in production for verified emails
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

  // Optional: enable debug logs in development
  debug: process.env.NODE_ENV !== "production",
});
