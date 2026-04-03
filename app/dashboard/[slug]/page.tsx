import CreateProduct from "@/components/dashboard/product/create-product";
import ShowAllProducts from "@/components/dashboard/product/show-all-product";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  getBrands,
  getCategories,
  getProducts,
} from "@/lib/actions/product.actions";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const paramsResolved = await params;
  const slug = paramsResolved.slug;

  const isCreateProductPage = slug === "create-product";
  const isProductPage = slug === "products";

  const [brandsResult, categoriesResult, productResult] = await Promise.all([
    getBrands(),
    getCategories(),
    getProducts(),
  ]);

  const brands = brandsResult.success ? brandsResult.brands || [] : [];
  const categories = categoriesResult.success
    ? categoriesResult.categories || []
    : [];
  const products = productResult.success ? productResult.products || [] : [];

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant='inset' />

      <SidebarInset>
        <SiteHeader />
        <div className='flex flex-col flex-1'>
          <div className='@container/main flex flex-col flex-1 gap-2'>
            <div className='flex flex-col gap-4 md:gap-6 py-4 md:py-6'>
              {isCreateProductPage && (
                <CreateProduct brands={brands} categories={categories} />
              )}
              {isProductPage && <ShowAllProducts />}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
