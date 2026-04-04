import NavCategory from "./nav-category";
import NavigationMenu from "./navigation-menu";

const categories = [
  {
    name: "Topwear",
    slug: "topwear",
    subcategory: [
      {
        name: "Men",
        slug: "men",
        subcategory: [
          { name: "T-Shirts", slug: "t-shirts" },
          { name: "Shirts", slug: "shirts" },
        ],
      },
      {
        name: "Women",
        slug: "women",
        subcategory: [
          { name: "Tops", slug: "tops" },
          { name: "Dresses", slug: "dresses" },
        ],
      },
    ],
  },
];

export default function Navbar() {
  return (
    <nav className='w-full'>
      <div className='flex flex-col bg-background px-4 md:px-8'>
        <NavigationMenu />
        <NavCategory categories={categories} />
      </div>
    </nav>
  );
}
