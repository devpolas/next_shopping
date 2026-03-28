"use client";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Cart({ count = 0 }: { count?: number }) {
  const router = useRouter();
  return (
    <div onClick={() => router.push("/cart")}>
      <p className='flex justify-center items-center p-0 rounded-full outline-0 ring-offset-0 w-6 h-6 hover:cursor-pointer'>
        <span className='inline-flex relative'>
          <ShoppingCart className='w-5 h-5' />

          <span className='inline-flex -top-1 -right-1 absolute justify-center items-center bg-blue-600 rounded-full w-4 h-4 font-medium text-[0.625rem] text-white'>
            {count}
          </span>
        </span>
      </p>
    </div>
  );
}
