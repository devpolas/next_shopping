import { Heading4 } from "@/components/typography/typography";

export default function Loading() {
  return (
    <div className='flex justify-center items-center min-h-[70vh]'>
      <Heading4
        text='Next Shopping'
        className='text-muted-foreground animate-pulse'
      />
    </div>
  );
}
