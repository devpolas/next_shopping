import { cn } from "@/lib/utils";

type PropsType = { className?: string | string[]; text: string };

export function Heading1({ className, text }: PropsType) {
  return (
    <h1
      className={cn(
        "font-extrabold text-4xl text-center text-balance tracking-tight scroll-m-20",
        className,
      )}
    >
      {text}
    </h1>
  );
}

export function Heading2({ className, text }: PropsType) {
  return (
    <h2
      className={cn(
        "first:mt-0 pb-2 border-b font-semibold text-3xl tracking-tight scroll-m-20",
        className,
      )}
    >
      {text}
    </h2>
  );
}

export function Heading3({ className, text }: PropsType) {
  return (
    <h3
      className={cn(
        "font-semibold text-2xl tracking-tight scroll-m-20",
        className,
      )}
    >
      {text}
    </h3>
  );
}

export function Heading4({ className, text }: PropsType) {
  return (
    <h4
      className={cn(
        "font-semibold text-xl tracking-tight scroll-m-20",
        className,
      )}
    >
      {text}
    </h4>
  );
}

export function Paragraph({ className, text }: PropsType) {
  return <p className={cn("not-first:mt-6 leading-7", className)}>{text}</p>;
}
