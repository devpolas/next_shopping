import Link from "next/link";

export default function MobileLogo() {
  return (
    <Link
      aria-label='Go to homepage'
      href='/'
      className='flex items-center gap-2 font-bold text-green-600 text-lg'
    >
      NEXTSHOP
    </Link>
  );
}
