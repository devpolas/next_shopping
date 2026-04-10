import { getCategories } from "@/lib/actions/product.actions";
import NavCategory from "./nav-category";
import NavHeader from "./nav-header";

export async function Navbar() {
  const categoryResult = await getCategories();

  console.log(categoryResult);

  const categories = categoryResult.success
    ? categoryResult.categories || []
    : [];

  return (
    <nav className='relative w-full'>
      <div className='flex flex-col bg-background px-2 md:px-10'>
        <NavHeader categories={categories} />

        <NavCategory categories={categories} />
      </div>
    </nav>
  );
}
