import AppLayout from "@/components/layouts/app-layout";
import { getProduct } from "@/lib/actions/product.actions";
import { Product } from "@/types/product";
import { notFound } from "next/navigation";

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
      <p>{id}</p>
    </AppLayout>
  );
}
