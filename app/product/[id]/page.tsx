import AppLayout from "@/components/layouts/app-layout";
import { Heading4 } from "@/components/typography/typography";
import { Badge } from "@/components/ui/badge";
import { getProduct } from "@/lib/actions/product.actions";
import { Product } from "@/types/product";
import { notFound } from "next/navigation";
import ShowProductImage from "@/components/product/show-product-img";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsResolvers = await params;
  const id = paramsResolvers.id;

  const productResult = await getProduct(id);

  const product: Product | undefined = productResult.success
    ? productResult.product
    : undefined;

  if (!productResult.success || !productResult.product) {
    return notFound();
  }
  console.log(product);
  return (
    <AppLayout>
      <div className='flex flex-row gap-10 mt-8'>
        <div className='flex-1'>
          <div className='w-full h-full'>
            {product?.images && <ShowProductImage img={product?.images} />}
          </div>
        </div>
        <div className='flex-2'>
          <div>
            <Heading4 text={product?.name || ""} />

            <Badge variant={"outline"}>
              {product?.brand ? product.brand.name : "unknown"}
            </Badge>
          </div>
        </div>
        <div>actions</div>
      </div>
    </AppLayout>
  );
}
