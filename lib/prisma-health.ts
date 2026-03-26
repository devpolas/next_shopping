import prisma from "@/lib/db";

export async function healthCheck() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("Prisma is running");
    return true;
  } catch (error) {
    console.error("Prisma health check failed:", error);
    return false;
  }
}
