import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function MobileLogo() {
  return (
    <Link
      aria-label='Go to homepage'
      href='/'
      className='flex items-center gap-2 font-bold text-green-600'
    >
      <ShoppingBag size={24} />
      <span className='md:text-lg text-xl xl:text-xl'>
        <strong>
          <em>NEXTSHOP</em>
        </strong>
      </span>
    </Link>
  );
}
