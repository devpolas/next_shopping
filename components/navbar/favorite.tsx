import { Heart } from "lucide-react";
import Link from "next/link";

export default function Favorite({ count = 0 }: { count?: number }) {
  return (
    <Link href={"/favorite"} aria-label={`Favorites: ${count}`}>
      <span className='inline-flex relative'>
        <Heart className='w-5 h-5' />

        <span className='inline-flex -top-1 -right-1 absolute justify-center items-center bg-red-600 rounded-full w-4 h-4 font-medium text-[0.625rem] text-white'>
          {count}
        </span>
      </span>
    </Link>
  );
}
