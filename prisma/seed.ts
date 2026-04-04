import prisma from "@/lib/db";
import { CategoryType } from "@/lib/generated/prisma/enums";
import slugify from "slugify";

type SubSubCategoryData = { name: string };
type SubCategoryData = { name: string; subSubCategories: SubSubCategoryData[] };
type CategoryData = {
  name: string;
  type: CategoryType;
  subCategories: SubCategoryData[];
};

const categoriesData: CategoryData[] = [
  {
    name: "Men",
    type: CategoryType.men,
    subCategories: [
      {
        name: "Topwear",
        subSubCategories: [
          { name: "T-Shirts" },
          { name: "Casual Shirts" },
          { name: "Formal Shirts" },
          { name: "Hoodies" },
          { name: "Jackets" },
        ],
      },
      {
        name: "Bottomwear",
        subSubCategories: [
          { name: "Jeans" },
          { name: "Trousers" },
          { name: "Shorts" },
          { name: "Joggers" },
        ],
      },
      {
        name: "Footwear",
        subSubCategories: [
          { name: "Casual Shoes" },
          { name: "Formal Shoes" },
          { name: "Sneakers" },
        ],
      },
    ],
  },
  {
    name: "Women",
    type: CategoryType.women,
    subCategories: [
      {
        name: "Topwear",
        subSubCategories: [
          { name: "Tops" },
          { name: "Blouses" },
          { name: "Tunics" },
          { name: "Dresses" },
        ],
      },
      {
        name: "Bottomwear",
        subSubCategories: [
          { name: "Jeans" },
          { name: "Trousers" },
          { name: "Skirts" },
          { name: "Leggings" },
        ],
      },
      {
        name: "Footwear",
        subSubCategories: [
          { name: "Heels" },
          { name: "Flats" },
          { name: "Boots" },
        ],
      },
    ],
  },
  {
    name: "Kids",
    type: CategoryType.kids,
    subCategories: [
      {
        name: "Boy",
        subSubCategories: [
          { name: "T-Shirts" },
          { name: "Shorts" },
          { name: "Jeans" },
        ],
      },
      {
        name: "Girl",
        subSubCategories: [
          { name: "Tops" },
          { name: "Dresses" },
          { name: "Skirts" },
        ],
      },
    ],
  },
  {
    name: "Unisex",
    type: CategoryType.unisex,
    subCategories: [
      {
        name: "Accessories",
        subSubCategories: [
          { name: "T-Shirts" },
          { name: "Hoodies" },
          { name: "Sneakers" },
        ],
      },
    ],
  },
  {
    name: "Beauty",
    type: CategoryType.beauty,
    subCategories: [
      {
        name: "Skincare",
        subSubCategories: [{ name: "Face Creams" }, { name: "Serums" }],
      },
      {
        name: "Makeup",
        subSubCategories: [{ name: "Lipsticks" }, { name: "Foundations" }],
      },
    ],
  },
  {
    name: "Sports",
    type: CategoryType.sports,
    subCategories: [
      {
        name: "Sportswear",
        subSubCategories: [{ name: "Jerseys" }, { name: "Shorts" }],
      },
      {
        name: "Equipment",
        subSubCategories: [{ name: "Balls" }, { name: "Rackets" }],
      },
    ],
  },
  {
    name: "Bags",
    type: CategoryType.bags,
    subCategories: [
      {
        name: "Backpacks",
        subSubCategories: [
          { name: "Laptop Backpacks" },
          { name: "Casual Backpacks" },
        ],
      },
      {
        name: "Handbags",
        subSubCategories: [{ name: "Totes" }, { name: "Clutches" }],
      },
    ],
  },
  {
    name: "Jewelry",
    type: CategoryType.jewelry,
    subCategories: [
      {
        name: "Necklaces",
        subSubCategories: [{ name: "Chains" }, { name: "Pendants" }],
      },
      {
        name: "Rings",
        subSubCategories: [{ name: "Gold Rings" }, { name: "Silver Rings" }],
      },
    ],
  },
  {
    name: "Watches",
    type: CategoryType.watches,
    subCategories: [
      {
        name: "Men Watches",
        subSubCategories: [{ name: "Analog" }, { name: "Digital" }],
      },
      {
        name: "Women Watches",
        subSubCategories: [{ name: "Analog" }, { name: "Smartwatches" }],
      },
    ],
  },
  {
    name: "Eyewear",
    type: CategoryType.eyewear,
    subCategories: [
      { name: "Sunglasses", subSubCategories: [] },
      { name: "Optical Glasses", subSubCategories: [] },
    ],
  },
  {
    name: "Winter",
    type: CategoryType.winter,
    subCategories: [
      { name: "Jackets & Coats", subSubCategories: [] },
      { name: "Sweaters", subSubCategories: [] },
    ],
  },
  {
    name: "Summer",
    type: CategoryType.summer,
    subCategories: [
      { name: "T-Shirts", subSubCategories: [] },
      { name: "Shorts", subSubCategories: [] },
    ],
  },
  {
    name: "Festive",
    type: CategoryType.festive,
    subCategories: [
      { name: "Party Wear", subSubCategories: [] },
      { name: "Traditional Wear", subSubCategories: [] },
    ],
  },
  {
    name: "Formal",
    type: CategoryType.formal,
    subCategories: [
      { name: "Shirts", subSubCategories: [] },
      { name: "Trousers", subSubCategories: [] },
    ],
  },
];

// ---------------- Helpers ----------------
function generateDescription(name: string): string {
  // Joins all names with arrows for a hierarchical description
  return `Explore our premium ${name} collection featuring a wide range of stylish, high-quality products designed for modern lifestyles. From everyday essentials to statement pieces, our ${name.toLowerCase()} category ensures comfort, durability, and trend-forward designs for every occasion.`;
}

// ---------------- Seed Function ----------------
async function main() {
  console.log("🌱 Seeding categories with automatic descriptions...");

  for (const category of categoriesData) {
    const categorySlug = slugify(category.name, { lower: true, strict: true });

    const createdCategory = await prisma.category.upsert({
      where: { slug: categorySlug },
      update: {},
      create: {
        name: category.name,
        slug: categorySlug,
        type: category.type,
        description: generateDescription(category.name),
      },
    });

    for (const subCat of category.subCategories) {
      const subCategorySlug = slugify(`${category.name}-${subCat.name}`, {
        lower: true,
        strict: true,
      });

      const createdSubCategory = await prisma.subCategory.upsert({
        where: {
          slug_categoryId: {
            slug: subCategorySlug,
            categoryId: createdCategory.id,
          },
        },
        update: {},
        create: {
          name: subCat.name,
          slug: subCategorySlug,
          categoryId: createdCategory.id,
        },
      });

      for (const subSubCat of subCat.subSubCategories) {
        const subSubCategorySlug = slugify(
          `${category.name}-${subCat.name}-${subSubCat.name}`,
          { lower: true, strict: true },
        );

        await prisma.subSubCategory.upsert({
          where: {
            slug_subCategoryId: {
              slug: subSubCategorySlug,
              subCategoryId: createdSubCategory.id,
            },
          },
          update: {},
          create: {
            name: subSubCat.name,
            slug: subSubCategorySlug,
            subCategoryId: createdSubCategory.id,
          },
        });
      }
    }
  }

  console.log(
    "✅ All categories, subcategories, and sub-subcategories seeded with descriptions!",
  );
}

// ---------------- Run ----------------
main()
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
