export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsResolvers = await params;
  const id = paramsResolvers.id;
  return <div>{id}</div>;
}
