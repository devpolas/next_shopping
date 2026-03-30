import prisma from "../db";

export async function userExits(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return { success: true, user: !!user };
  } catch (error) {
    return { success: false, error: "Database error" };
  }
}
