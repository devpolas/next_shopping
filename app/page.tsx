import DisplayCategory from "@/components/home/display-category";
import AppLayout from "@/components/layouts/app-layout";
import Slider from "@/components/slider/slider";
import { getCategories } from "@/lib/actions/product.actions";

export default async function Home() {
  const categoryResult = await getCategories();

  const categories = categoryResult.success
    ? categoryResult.categories || []
    : [];

  return (
    <AppLayout>
      <Slider />
      <DisplayCategory category={categories} />
    </AppLayout>
  );
}
