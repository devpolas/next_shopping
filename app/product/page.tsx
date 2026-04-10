import AppLayout from "@/components/layouts/app-layout";
import ProductCards from "@/components/product/product-cards";

export default function ProductPage() {
  return (
    <AppLayout>
      <section className='px-2 lg:px-4 py-4 lg:py-8'>
        <ProductCards />
      </section>
    </AppLayout>
  );
}
