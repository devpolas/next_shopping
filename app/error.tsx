"use client";

import { Heading4 } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error Boundary:", error);
  }, [error]);

  return (
    <div className='flex flex-col justify-center items-center gap-4 px-4 min-h-[70vh] text-center'>
      <Heading4 text='Something went wrong' className='text-red-600' />

      {/* Show error only in development */}
      {process.env.NODE_ENV === "development" && (
        <p className='max-w-md text-muted-foreground text-sm'>
          {error.message}
        </p>
      )}

      <div className='flex flex-col items-center gap-3 mt-4'>
        <Button variant='destructive' onClick={() => reset()}>
          Try again
        </Button>

        <Link
          href='/'
          className='hover:bg-muted px-4 py-2 border border-border rounded-md font-medium text-sm transition'
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
