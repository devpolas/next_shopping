"use server";

import slugify from "slugify";
import { ProductInput, productSchema } from "../validators/product-schema";

import {
  Brand,
  Category,
  Product,
  SubCategory,
  SubSubCategory,
} from "@/types/product";
import prisma from "../prisma";
import { CategoryType } from "@/app/generated/prisma/enums";

interface ResponseInterface {
  success: boolean;
  message: string;
}

//TODO Brand actions

export async function createBrand(name: string): Promise<ResponseInterface> {
  const brandName = name.trim();
  try {
    const exists = await prisma.brand.findUnique({
      where: { name: brandName },
    });
    if (exists) return { success: false, message: "Brand already exists" };

    await prisma.brand.create({ data: { name: brandName } });
    return { success: true, message: "Brand created successfully" };
  } catch (error) {
    console.error("Brand create error:", error);
    return { success: false, message: "Something went wrong" };
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
    console.error("Brands fetch error:", error);
    return { success: false, message: "Failed to fetch brands" };
  }
}

export async function updateBrand(
  id: string,
  name: string,
  isActive?: boolean,
): Promise<ResponseInterface> {
  try {
    await prisma.brand.update({
      where: { id },
      data: { name: name.trim(), ...(isActive !== undefined && { isActive }) },
    });
    return { success: true, message: "Brand updated successfully" };
  } catch (error) {
    console.error("Brand update error:", error);
    return { success: false, message: "Failed to update brand" };
  }
}

export async function deleteBrand(id: string): Promise<ResponseInterface> {
  try {
    await prisma.brand.delete({ where: { id } });
    return { success: true, message: "Brand deleted successfully" };
  } catch (error) {
    console.error("Brand delete error:", error);
    return { success: false, message: "Failed to delete brand" };
  }
}

//TODO Category actions

export async function createCategory(
  name: string,
  type: CategoryType,
  description?: string,
): Promise<ResponseInterface> {
  const slug = slugify(name.trim());

  try {
    const exists = await prisma.category.findFirst({ where: { slug } });
    if (exists) return { success: false, message: "Category already exists" };

    await prisma.category.create({ data: { name, slug, type, description } });
    return { success: true, message: "Category created successfully" };
  } catch (error) {
    console.error("Category create error:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function getCategories(): Promise<{
  success: boolean;
  categories?: Category[];
  message?: string;
}> {
  try {
    const categories = await prisma.category.findMany({
      include: { subCategories: { include: { subSubCategories: true } } },
    });
    return { success: true, categories };
  } catch (error) {
    console.error("Category fetch error:", error);
    return { success: false, message: "Failed to fetch categories" };
  }
}

export async function updateCategory(
  id: string,
  name: string,
  type?: CategoryType,
  description?: string,
  isActive?: boolean,
): Promise<ResponseInterface> {
  const slug = slugify(name.trim());
  try {
    await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
        ...(type && { type }),
        ...(description && { description }),
        ...(isActive !== undefined && { isActive }),
      },
    });
    return { success: true, message: "Category updated successfully" };
  } catch (error) {
    console.error("Category update error:", error);
    return { success: false, message: "Failed to update category" };
  }
}

export async function deleteCategory(id: string): Promise<ResponseInterface> {
  try {
    await prisma.category.delete({ where: { id } });
    return { success: true, message: "Category deleted successfully" };
  } catch (error) {
    console.error("Category delete error:", error);
    return { success: false, message: "Failed to delete category" };
  }
}

//TODO SubCategory actions

export async function createSubCategory(
  categoryId: string,
  name: string,
): Promise<ResponseInterface> {
  if (!categoryId)
    return { success: false, message: "Category ID is required" };
  const slug = slugify(name.trim());

  try {
    const exists = await prisma.subCategory.findFirst({
      where: { categoryId, slug },
    });
    if (exists)
      return {
        success: false,
        message: "SubCategory already exists under this category",
      };

    await prisma.subCategory.create({ data: { name, slug, categoryId } });
    return { success: true, message: "SubCategory created successfully" };
  } catch (error) {
    console.error("SubCategory create error:", error);
    return { success: false, message: "Something went wrong" };
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
      include: { subSubCategories: true },
    });
    return { success: true, subCategories };
  } catch (error) {
    console.error("SubCategory fetch error:", error);
    return { success: false, message: "Failed to fetch SubCategories" };
  }
}

export async function updateSubCategory(
  id: string,
  name: string,
  isActive?: boolean,
): Promise<ResponseInterface> {
  const slug = slugify(name.trim());
  try {
    await prisma.subCategory.update({
      where: { id },
      data: { name, slug, ...(isActive !== undefined && { isActive }) },
    });
    return { success: true, message: "SubCategory updated successfully" };
  } catch (error) {
    console.error("SubCategory update error:", error);
    return { success: false, message: "Failed to update SubCategory" };
  }
}

export async function deleteSubCategory(
  id: string,
): Promise<ResponseInterface> {
  try {
    await prisma.subCategory.delete({ where: { id } });
    return { success: true, message: "SubCategory deleted successfully" };
  } catch (error) {
    console.error("SubCategory delete error:", error);
    return { success: false, message: "Failed to delete SubCategory" };
  }
}

//TODO SUBSUBCATEGORY actions

export async function createSubSubCategory(
  subCategoryId: string,
  name: string,
): Promise<ResponseInterface> {
  if (!subCategoryId)
    return { success: false, message: "SubCategory ID is required" };
  const slug = slugify(name.trim());

  try {
    const exists = await prisma.subSubCategory.findFirst({
      where: { subCategoryId, slug },
    });
    if (exists)
      return {
        success: false,
        message: "SubSubCategory already exists under this subcategory",
      };

    await prisma.subSubCategory.create({ data: { name, slug, subCategoryId } });
    return { success: true, message: "SubSubCategory created successfully" };
  } catch (error) {
    console.error("SubSubCategory create error:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function getSubSubCategories(subCategoryId: string): Promise<{
  success: boolean;
  subSubCategories?: SubSubCategory[];
  message?: string;
}> {
  try {
    const subSubCategories = await prisma.subSubCategory.findMany({
      where: { subCategoryId },
    });
    return { success: true, subSubCategories };
  } catch (error) {
    console.error("SubSubCategory fetch error:", error);
    return { success: false, message: "Failed to fetch SubSubCategories" };
  }
}

export async function updateSubSubCategory(
  id: string,
  name: string,
  isActive?: boolean,
): Promise<ResponseInterface> {
  const slug = slugify(name.trim());
  try {
    await prisma.subSubCategory.update({
      where: { id },
      data: { name, slug, ...(isActive !== undefined && { isActive }) },
    });
    return { success: true, message: "SubSubCategory updated successfully" };
  } catch (error) {
    console.error("SubSubCategory update error:", error);
    return { success: false, message: "Failed to update SubSubCategory" };
  }
}

export async function deleteSubSubCategory(
  id: string,
): Promise<ResponseInterface> {
  try {
    await prisma.subSubCategory.delete({ where: { id } });
    return { success: true, message: "SubSubCategory deleted successfully" };
  } catch (error) {
    console.error("SubSubCategory delete error:", error);
    return { success: false, message: "Failed to delete SubSubCategory" };
  }
}

//TODO PRODUCT Actions

export async function createProduct(
  data: ProductInput,
): Promise<ResponseInterface> {
  try {
    const productData = productSchema.parse(data);
    const slug = slugify(productData.name);

    const exists = await prisma.product.findUnique({ where: { slug } });
    if (exists) return { success: false, message: "Product already exists" };

    await prisma.product.create({
      data: {
        name: productData.name,
        slug,
        description: productData.description,
        price: productData.price,
        discountPrice: productData.discountPrice,
        gender: productData.gender,
        categoryId: productData.categoryId,
        subCategoryId: productData.subCategoryId,
        subSubCategoryId: productData.subSubCategoryId,
        brandId: productData.brandId,
        images: { create: productData.images.map((img) => ({ url: img.url })) },
        variants: { create: productData.variants },
        updatedAt: new Date(),
      },
    });

    return { success: true, message: "Product created successfully" };
  } catch (error) {
    console.error("Product create error:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function getProducts(): Promise<{
  success: boolean;
  products?: Product[];
  message?: string;
}> {
  try {
    const response = await prisma.product.findMany({
      include: {
        images: true,
        variants: true,
        brand: true,
        category: true,
        subCategory: true,
        subSubCategory: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const products: Product[] = response.map((p) => ({
      ...p,
      price: p.price.toNumber(),
      discountPrice: p.discountPrice?.toNumber() ?? null,
    }));

    return { success: true, products };
  } catch (error) {
    console.error("Product fetch error:", error);
    return { success: false, message: "Failed to fetch products" };
  }
}

export async function updateProduct(
  id: string,
  data: ProductInput,
): Promise<ResponseInterface> {
  try {
    const productData = productSchema.parse(data);
    const slug = slugify(productData.name);

    await prisma.product.update({
      where: { id },
      data: {
        name: productData.name,
        slug,
        description: productData.description,
        price: productData.price,
        discountPrice: productData.discountPrice,
        gender: productData.gender,
        categoryId: productData.categoryId,
        subCategoryId: productData.subCategoryId,
        subSubCategoryId: productData.subSubCategoryId,
        brandId: productData.brandId,
        images: {
          deleteMany: {},
          create: productData.images.map((img) => ({ url: img.url })),
        },
        variants: { deleteMany: {}, create: productData.variants },
      },
    });

    return { success: true, message: "Product updated successfully" };
  } catch (error) {
    console.error("Product update error:", error);
    return { success: false, message: "Failed to update product" };
  }
}

export async function deleteProduct(id: string): Promise<ResponseInterface> {
  try {
    await prisma.product.delete({ where: { id } });
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    console.error("Product delete error:", error);
    return { success: false, message: "Failed to delete product" };
  }
}

export async function isProductExists(
  name: string,
): Promise<ResponseInterface> {
  const slug = slugify(name);
  try {
    const product = await prisma.product.findUnique({ where: { slug } });
    return product
      ? { success: true, message: "Product already exists" }
      : { success: false, message: "Product does not exist" };
  } catch (error) {
    console.error("Product exists check error:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function getProduct(
  id: string,
): Promise<{ success: boolean; message?: string; product?: Product }> {
  try {
    const productResult = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        brand: true,
        category: true,
        subCategory: true,
        subSubCategory: true,
        variants: true,
      },
    });
    if (!productResult) {
      return { success: false, message: "failed to fetch product" };
    }

    const product = {
      ...productResult,
      price: Number(productResult.price),
      discountPrice: productResult.discountPrice
        ? Number(productResult.discountPrice)
        : null,
    };

    return { success: true, product };
  } catch (error) {
    console.error("Product fetch error", error);
    return { success: false, message: "something went wrong" };
  }
}
