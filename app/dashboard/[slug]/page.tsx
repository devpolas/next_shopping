import CreateProduct from "@/components/product/create-product";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getBrands, getCategories } from "@/lib/actions/product.actions";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const paramsResolved = await params;
  const slug = paramsResolved.slug;

  const isCreateProductPage = slug === "create-product";

  const [brandsResult, categoriesResult] = await Promise.all([
    getBrands(),
    getCategories(),
  ]);

  const brands = brandsResult.success ? brandsResult.brands || [] : [];
  const categories = categoriesResult.success
    ? categoriesResult.categories || []
    : [];

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
      {isCreateProductPage && (
        <SidebarInset>
          <SiteHeader />
          <div className='flex flex-col flex-1'>
            <div className='@container/main flex flex-col flex-1 gap-2'>
              <div className='flex flex-col gap-4 md:gap-6 py-4 md:py-6'>
                <CreateProduct brands={brands} categories={categories} />
              </div>
            </div>
          </div>
        </SidebarInset>
      )}
    </SidebarProvider>
  );
}
