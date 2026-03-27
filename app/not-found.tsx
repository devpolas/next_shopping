import { Heading4, Paragraph } from "@/components/typography/typography";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center px-4 min-h-[75vh] text-center'>
      <Heading4 text='404 - Not Found' className='text-red-600' />

      <Paragraph
        text="Sorry, we couldn't find the page you're looking for."
        className='mt-2 text-muted-foreground'
      />

      <Link
        href='/'
        className='hover:bg-muted mt-6 px-4 py-2 border border-border rounded-md font-medium text-sm transition'
      >
        Return Home
      </Link>
    </div>
  );
}
