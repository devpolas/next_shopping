"use client";

import { Heart } from "lucide-react";
import { Button } from "../ui/button";

export default function Favorite({ count = 0 }: { count?: number }) {
  return (
    <Button variant='ghost' size='icon-lg' aria-label={`Favorites: ${count}`}>
      <span className='inline-flex relative'>
        <Heart size={32} />

        <span className='inline-flex -top-1 -right-1 absolute justify-center items-center bg-red-600 rounded-full w-4 h-4 font-medium text-[0.625rem] text-white'>
          {count}
        </span>
      </span>
    </Button>
  );
}
