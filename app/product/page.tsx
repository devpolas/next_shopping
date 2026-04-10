import AppLayout from "@/components/layouts/app-layout";
import ProductCards from "@/components/product/product-cards";
import { getProducts } from "@/lib/actions/product.actions";

export default async function ProductPage() {
  const productsResult = await getProducts();

  const products = productsResult.success ? productsResult.products || [] : [];

  return (
    <AppLayout>
      <section className='px-2 lg:px-4 py-4 lg:py-8'>
        <ProductCards products={products} />
      </section>
    </AppLayout>
  );
}
