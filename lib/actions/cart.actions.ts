"use server";
import prisma from "../prisma";
import { session } from "./auth.actions";

export async function getOrCreateCart(userId: string) {
  return await prisma.cart.upsert({
    where: { userId },
    create: { userId },
    update: {},
    include: {
      items: {
        include: {
          product: true,
          variant: true,
        },
      },
    },
  });
}

export async function cleanCart(userId: string) {
  const cart = await prisma.cart.findUnique({ where: { userId } });

  if (!cart) {
    return;
  }

  return await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
}

export async function addToCart({
  productId,
  variantId,
  quantity = 1,
}: {
  productId: string;
  variantId: string;
  quantity: number;
}) {
  const currentUser = await session();
  if (!currentUser) {
    return { success: false, message: "please use local cart" };
  }
  const cart = await getOrCreateCart(currentUser.id);

  const existing = await prisma.cartItem.findUnique({
    where: {
      cartId_productId_variantId: {
        cartId: cart.id,
        productId,
        variantId,
      },
    },
  });

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: {
        quantity: existing.quantity + quantity,
      },
    });

    return { success: true, message: "successfully updated cart" };
  }

  await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      variantId,
      quantity,
    },
  });

  return { success: true, message: "successfully add to cart" };
}

export async function updateCartItem(itemId: string, quantity: number) {
  if (quantity <= 0) {
    return prisma.cartItem.delete({ where: { id: itemId } });
  }

  return prisma.cartItem.update({
    where: { id: itemId },
    data: {
      quantity,
    },
  });
}

export async function deleteCartItem(itemId: string) {
  return await prisma.cartItem.delete({ where: { id: itemId } });
}
