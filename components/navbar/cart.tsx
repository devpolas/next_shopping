"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

export default function Cart({ count = 0 }: { count?: number }) {
  return (
    <Button variant='ghost' size='icon-lg' aria-label={`Cart: ${count} items`}>
      <span className='inline-flex relative'>
        <ShoppingCart size={32} />

        <span className='inline-flex -top-1 -right-1 absolute justify-center items-center bg-blue-600 rounded-full w-4 h-4 font-medium text-[0.625rem] text-white'>
          {count}
        </span>
      </span>
    </Button>
  );
}
