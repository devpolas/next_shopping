import { useIsMobile } from "@/hooks/use-mobile";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import MobileNav from "../navbar/mobile-nav";

export default function Logo() {
  const isMobile = useIsMobile();
  return (
    <Link
      aria-label='Go to homepage'
      href='/'
      className='flex items-center gap-2 font-bold text-green-600 text-lg md:text-xl'
    >
      <span className='flex flex-row items-center gap-1'>
        <span>{isMobile ? <MobileNav /> : <ShoppingBag size={24} />}</span>
        <span>NEXTSHOP</span>
      </span>
    </Link>
  );
}
