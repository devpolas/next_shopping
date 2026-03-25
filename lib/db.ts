import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "./generated/prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

// Ensure environment variables exist
const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error("Missing NeonDB connection string environment variables");
}

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL as string,
});

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export default prisma;
