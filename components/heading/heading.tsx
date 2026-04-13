import { Heading4 } from "../typography/typography";
import clsx from "clsx";

type HeadingProps = {
  text: string;
  className?: string;
  containerClass?: string;
};

export default function Heading({
  text,
  className,
  containerClass,
}: HeadingProps) {
  return (
    <div className={clsx("w-full", containerClass)}>
      <div
        className={clsx(
          "inline-block bg-muted-foreground px-4 md:px-6 py-1 polygon",
          className,
        )}
      >
        <Heading4 text={text} />
      </div>

      <div className='border-muted-foreground border-b-4 w-full' />
    </div>
  );
}
