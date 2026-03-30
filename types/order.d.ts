export type PaymentMethod = "cod" | "stripe" | "ssl_commerz";

export type PaymentStatus = "pending" | "success" | "failed";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "canceled";

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;

  totalAmount: number;
  status: OrderStatus;

  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;

  items: OrderItem[];
}

export interface Payment {
  id: string;
  orderId: string;

  method: PaymentMethod;
  status: PaymentStatus;

  transactionId?: string;
}
