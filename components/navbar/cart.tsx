import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Cart({ count = 0 }: { count?: number }) {
  return (
    <Link href={"/cart"} aria-label={`Cart: ${count} items`}>
      <span className='inline-flex relative'>
        <ShoppingCart className='w-5 h-5' />

        <span className='inline-flex -top-1 -right-1 absolute justify-center items-center bg-blue-600 rounded-full w-4 h-4 font-medium text-[0.625rem] text-white'>
          {count}
        </span>
      </span>
    </Link>
  );
}
