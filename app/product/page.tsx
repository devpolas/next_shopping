import AppLayout from "@/components/layouts/app-layout";
import ProductCards from "@/components/product/product-cards";
import { getBrands, getCategories } from "@/lib/actions/product.actions";

export default async function ProductPage() {
  const [brandsResult, categoriesResult] = await Promise.all([
    getBrands(),
    getCategories(),
  ]);

  const brands = brandsResult.success ? brandsResult.brands || [] : [];
  const categories = categoriesResult.success
    ? categoriesResult.categories || []
    : [];

  return (
    <AppLayout>
      <section className='px-2 lg:px-4 py-4 lg:py-8'>
        <ProductCards brands={brands} categories={categories} />
      </section>
    </AppLayout>
  );
}
