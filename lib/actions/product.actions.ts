"use server";

import prisma from "../db";
import slugify from "slugify";
import { ProductInput, productSchema } from "../validators/product-schema";
import { Brand, Category, Product, SubCategory } from "@/types/product";

interface ResponseInterface {
  success: boolean;
  message: string;
}

export async function createBrand(name: string): Promise<ResponseInterface> {
  const brandName = name.toLocaleLowerCase();
  try {
    const isExists = await prisma.brand.findUnique({
      where: { name: brandName },
    });

    if (isExists) {
      return { success: false, message: "Brand already exists" };
    }

    await prisma.brand.create({
      data: { name: brandName },
    });

    return { success: true, message: "Brand successfully created" };
  } catch (error) {
    console.error("Brand create error:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function createCategory(name: string): Promise<ResponseInterface> {
  const categoryName = name.toLocaleLowerCase();
  try {
    const isExists = await prisma.category.findUnique({
      where: { name: categoryName },
    });

    if (isExists) {
      return { success: false, message: "Category already exists" };
    }

    const slug = slugify(categoryName);

    await prisma.category.create({
      data: { name: categoryName, slug },
    });

    return { success: true, message: "Category successfully created" };
  } catch (error) {
    console.error("Category create error:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function createSubCategory(
  categoryId: string,
  name: string,
): Promise<ResponseInterface> {
  const subcategoryName = name.toLocaleLowerCase();
  if (!categoryId) {
    return {
      success: false,
      message: "Please Provide category for creating subcategory",
    };
  }
  try {
    const isExists = await prisma.subCategory.findFirst({
      where: { categoryId, name: subcategoryName },
    });

    if (isExists) {
      return {
        success: false,
        message: "SubCategory already exists under this category",
      };
    }

    const slug = slugify(subcategoryName);

    await prisma.subCategory.create({
      data: {
        name: subcategoryName,
        slug,
        categoryId,
      },
    });

    return { success: true, message: "SubCategory successfully created" };
  } catch (error) {
    console.error("SubCategory create error:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function createProduct(
  data: ProductInput,
): Promise<ResponseInterface> {
  const productData = productSchema.parse(data);

  const {
    name,
    price,
    discountPrice,
    description,
    gender,
    categoryId,
    isActive,
    isFeatured,
    brandId,
    isNew,
    images,
    subCategoryId,
    variants,
  } = productData;

  const slug = slugify(name);

  try {
    const isExits = await prisma.product.findUnique({ where: { slug } });
    if (isExits) {
      return { success: false, message: "product already exits" };
    }

    await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        discountPrice,
        gender,
        categoryId,
        subCategoryId,
        brandId,
        isFeatured,
        isNew,
        isActive,
        images: {
          create: images.map((img) => ({ url: img.url })),
        },
        variants: {
          create: variants.map((v) => ({
            size: v.size,
            color: v.color,
            stock: v.stock,
          })),
        },
      },
    });

    return { success: true, message: "Product created successfully" };
  } catch (error) {
    console.error("create product failed", error);
    return { success: false, message: "something went wrong" };
  }
}

export async function getProducts(): Promise<{
  success: boolean;
  message?: string;
  products?: Product[];
}> {
  try {
    const response = await prisma.product.findMany({
      include: {
        images: true,
        variants: true,
        brand: true,
        category: true,
        subCategory: true,
      },
    });

    const products: Product[] = response.map((p) => ({
      ...p,
      price: p.price.toNumber(),
      discountPrice: p.discountPrice?.toNumber() ?? null,
    }));

    return { success: true, products };
  } catch (error) {
    console.error("failed to fetch products data", error);
    return { success: false, message: "something went wrong" };
  }
}

export async function getBrands(): Promise<{
  success: boolean;
  brands?: Brand[];
  message?: string;
}> {
  try {
    const brands = await prisma.brand.findMany();

    return { success: true, brands };
  } catch (error) {
    console.error("brands fetch failed", error);
    return { success: false, message: "failed to fetch brands" };
  }
}

export async function getCategories(): Promise<{
  success: boolean;
  categories?: Category[];
  message?: string;
}> {
  try {
    const categories = await prisma.category.findMany();

    return { success: true, categories };
  } catch (error) {
    console.error("Category fetch failed", error);
    return { success: false, message: "fail to fetch category" };
  }
}

export async function getSubCategories(categoryId: string): Promise<{
  success: boolean;
  subCategories?: SubCategory[];
  message?: string;
}> {
  if (!categoryId) {
    return { success: false, message: "Please provide categoryId" };
  }
  try {
    const subCategories = await prisma.subCategory.findMany({
      where: { categoryId },
    });
    return { success: true, subCategories };
  } catch (error) {
    console.error("subcategory fetch failed", error);
    return { success: false, message: "failed to fetch subcategory" };
  }
}

export async function isProductExits(name: string): Promise<ResponseInterface> {
  const slug = slugify(name);
  try {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (product) {
      return { success: true, message: "product already exits" };
    }
    return { success: false, message: "product doesn't exits" };
  } catch (error) {
    console.error("failed to fetch product");
    return { success: true, message: "something went wrong" };
  }
}
