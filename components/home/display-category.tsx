import { Category } from "@/types/product";
import { Button } from "../ui/button";
import Link from "next/link";
import Heading from "../heading/heading";
import clsx from "clsx";

type DisplayCategoryProps = {
  category: Category[];
  className?: string;
};

export default function DisplayCategory({
  category,
  className,
}: DisplayCategoryProps) {
  return (
    <section className={clsx("pt-8", className)}>
      <Heading text='Top Categories' className='w-56 md:w-64' />

      {/* Empty state */}
      {category.length === 0 ? (
        <p className='pt-4 text-muted-foreground'>No categories found</p>
      ) : (
        <div className='flex flex-wrap justify-center gap-2 pt-4'>
          {category.map((cat) => (
            <Button
              key={cat.slug}
              variant='outline'
              asChild
              className={clsx(
                "px-4 py-2 min-w-25 h-auto",
                "hover:border-green-600 hover:text-green-600",
                "transition-colors duration-200",
              )}
            >
              <Link href={`/product?category=${cat.slug}`}>{cat.name}</Link>
            </Button>
          ))}
        </div>
      )}
    </section>
  );
}
