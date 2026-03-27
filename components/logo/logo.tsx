import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      aria-label='Go to homepage'
      href='/'
      className='flex items-center gap-2 font-bold text-green-600 text-xl'
    >
      <ShoppingBag size={24} />
      NEXTSHOP
    </Link>
  );
}
