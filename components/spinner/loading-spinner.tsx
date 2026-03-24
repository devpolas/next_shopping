import { LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role='status'
      aria-label='Loading'
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export default function LoadingSpinner({ text }: { text?: string }) {
  return (
    <div className='flex items-center gap-4'>
      <div className='flex flex-row gap-2'>
        <Spinner />
        <p>{text}</p>
      </div>
    </div>
  );
}
