"use server";

import prisma from "../db";
import slugify from "slugify";
import { ProductInput, productSchema } from "../validators/product-schema";

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

    const slug = slugify(brandName);

    await prisma.brand.create({
      data: { name: brandName, slug },
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
