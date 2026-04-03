import { DataTable } from "@/components/table/table";
import { Product } from "@/types/product";

export default function ShowAllProducts({
  allProducts,
}: {
  allProducts: Product[];
}) {
  return (
    <div>
      <DataTable data={allProducts} />
    </div>
  );
}
