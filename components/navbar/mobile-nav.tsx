import { Menu } from "lucide-react";
import { Sheet } from "../ui/sheet";

type SubSubCategory = {
  name: string;
  slug: string;
};

type SubCategory = {
  name: string;
  slug: string;
  subcategory: SubSubCategory[];
};

type Category = {
  name: string;
  slug: string;
  subcategory: SubCategory[];
};

export default function MobileNav({ categories }: { categories: Category[] }) {
  return (
    <Sheet>
      <Menu />
    </Sheet>
  );
}
