"use client";
type LocalCartItem = {
  productId: string;
  variantId: string;
  quantity: number;
};

const CART_KEY = "cart";

export function getLocalCart(): LocalCartItem[] {
  if (typeof window === undefined) {
    return [];
  }
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

export function setLocalCart(cart: LocalCartItem[]) {
  return localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToLocalCart(item: LocalCartItem) {
  const cart = getLocalCart();

  const existing = cart.find(
    (i) => i.productId === item.productId && i.variantId === item.variantId,
  );

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  setLocalCart(cart);
}

export async function syncCartOnLogin() {
  const localCart = getLocalCart();
  if (!localCart.length) return;

  await fetch("/api/cart/sync", {
    method: "POST",
    body: JSON.stringify({ items: localCart }),
  });

  localStorage.removeItem("cart");
}
