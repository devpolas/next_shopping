"use server";

import prisma from "../db";
import slugify from "slugify";
import { ProductInput, productSchema } from "../validators/product-schema";
import { Brand, Category, SubCategory } from "@/types/product";

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

export async function createProduct(data: ProductInput) {
  const productData = productSchema.parse(data);
}

export async function getBrands(): Promise<{
  success: boolean;
  brands?: Brand[];
  message?: string;
}> {
  try {
    const brands = await prisma.brand.findMany({});

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
    const categories = await prisma.category.findMany({});

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
