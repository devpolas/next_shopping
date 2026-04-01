"use server";

import prisma from "../db";

export async function createCategory(name: string) {
  const isExits = await prisma.category.findUnique({
    where: {
      name,
    },
  });
}
