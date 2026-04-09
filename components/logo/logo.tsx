import { Category } from "@/types/product";
import MobileNav from "../navbar/mobile-nav";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Logo({ categories }: { categories: Category[] }) {
  return (
    <div className='flex items-center gap-2 font-bold text-green-600 text-lg md:text-xl'>
      {/* Mobile menu (NOT inside Link) */}
      <span className='md:hidden'>
        <MobileNav categories={categories} />
      </span>

      {/* Logo */}
      <Link
        aria-label='Go to homepage'
        href='/'
        className='flex items-center gap-1'
      >
        <span className='hidden md:flex'>
          <ShoppingBag size={24} />
        </span>

        <span>NEXTSHOP</span>
      </Link>
    </div>
  );
}
