"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import Loading from "@/app/loading";
import { Heading3 } from "../typography/typography";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { FormRhfInput } from "../rhf-input/form-rhf-input";
import { FormRhfSelect } from "../rhf-input/form-rfh-select";
import FormRhfTextarea from "../rhf-input/form-rfh-textarea";
import LoadingSpinner from "../spinner/loading-spinner";
import { ReusableDialog } from "../dialog/dialog";
import { Label } from "../ui/label";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Product name must be at least 3 characters" })
    .max(100, { message: "Product name cannot exceed 100 characters" }),
  description: z
    .string()
    .trim()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(1000, { message: "Description cannot exceed 1000 characters" }),
  price: z
    .number({ error: "Price must be a number" })
    .positive({ message: "Price must be positive" }),
  discountPrice: z
    .number({ error: "Discount must be a number" })
    .positive({ message: "Discount must be positive" })
    .optional(),
  gender: z.enum(["men", "women", "unisex"]),
  categoryId: z.string().min(1, { message: "Category is required" }),
  subCategoryId: z.string().min(1, { message: "Subcategory is required" }),
  brandId: z.string().optional(),
  images: z
    .array(
      z.object({
        file: z.instanceof(File, { message: "File is required" }),
        url: z.string(),
      }),
    )
    .min(1, { message: "At least one image is required" }),
  isFeatured: z.enum(["true", "false"]),
  isNew: z.enum(["true", "false"]),
  isActive: z.enum(["true", "false"]),
  stock: z
    .number({ error: "Stock is required" })
    .positive({ error: "Stock must be positive" }),
  size: z.string({ error: "Size is required" }),
  color: z.string({ error: "Color is required" }),
});

export type ProductInput = z.infer<typeof productSchema>;

const productData = {
  gender: [
    { label: "Men", value: "men" },
    { label: "Women", value: "women" },
    { label: "Unisex", value: "unisex" },
  ],
  isFeatured: [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  isNew: [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  isActive: [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  brand: [
    { label: "Tata", value: "tata" },
    { label: "Bata", value: "bata" },
  ],
  category: [
    { label: "T-shirt", value: "t-shirt" },
    { label: "Gents", value: "gents" },
  ],
  subCategory: [
    { label: "T-shirt", value: "t-shirt" },
    { label: "Gents", value: "gents" },
  ],
};

export default function CreateProduct() {
  const [mounted, setMounted] = useState(false);
  const session = authClient.useSession();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogIdentifier, setDialogIdentifier] = useState<string>("");

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
      discountPrice: undefined,
      gender: undefined,
      categoryId: "",
      subCategoryId: "",
      brandId: undefined,
      isFeatured: undefined,
      isNew: undefined,
      isActive: undefined,
      images: [],
    },
  });

  const imagesFieldArray = useFieldArray({
    control,
    name: "images",
  });

  const price = watch("price");
  const discountPrice = watch("discountPrice");

  // ------------------- Watch Images for Reactive UI -------------------
  const images = watch("images");

  // ------------------- Handle Image Upload -------------------
  const handleImageChange = (files: FileList | null) => {
    if (!files) return;

    const remainingSlots = 5 - images.length;
    const fileArray = Array.from(files).slice(0, remainingSlots);

    fileArray.forEach((file) => {
      imagesFieldArray.append({
        file,
        url: URL.createObjectURL(file),
      });
    });
  };

  // ------------------- Remove Image -------------------
  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index].url);
    imagesFieldArray.remove(index);
  };

  // ------------------- handle dialog -------------------
  function handleDialog(id: string) {
    setDialogIdentifier(id);
    setIsDialogOpen((pre) => !pre);
  }

  // ------------------- Submit Form-------------------
  const onSubmit = async (data: ProductInput) => {
    console.log("Submitting Product:", data);
    // TODO: Replace with API call
    alert("Product submitted! Check console for data.");
  };

  useEffect(() => setMounted(true), []);

  if (!mounted || session.isPending) return <Loading />;

  return (
    <>
      {!isDialogOpen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mx-auto w-full 2xl:w-6xl'
        >
          <Heading3
            text='Create New Product'
            className='mb-8 text-muted-foreground'
          />

          <div className='flex flex-col gap-6'>
            <div className='flex lg:flex-row flex-col gap-6'>
              {/* ---------------- Left Column ---------------- */}
              <div className='flex flex-col flex-1 gap-6'>
                <FormRhfInput
                  name='name'
                  type='text'
                  control={control}
                  label='Product Name'
                  placeholder='Enter product name'
                />
                <FormRhfInput
                  name='price'
                  control={control}
                  type='number'
                  label='Price'
                  placeholder='Enter price'
                />
                <FormRhfInput
                  name='discountPrice'
                  control={control}
                  type='number'
                  label='Discount Price'
                  placeholder='Enter discount price'
                />

                {discountPrice && discountPrice >= price && (
                  <p className='text-red-500 text-sm'>
                    {" "}
                    Discount must be less than price{" "}
                  </p>
                )}

                <FormRhfInput
                  name='stock'
                  control={control}
                  type='number'
                  label='Stock'
                  placeholder='Enter stock amount'
                />

                <FormRhfSelect
                  control={control}
                  name='gender'
                  label='Gender'
                  options={productData.gender}
                  placeholder='Select Gender'
                />
                <FormRhfSelect
                  control={control}
                  name='isFeatured'
                  label='Featured'
                  options={productData.isFeatured}
                  placeholder='Featured?'
                />
                <FormRhfSelect
                  control={control}
                  name='isNew'
                  label='New'
                  options={productData.isNew}
                  placeholder='New?'
                />
                <FormRhfSelect
                  control={control}
                  name='isActive'
                  label='Active'
                  options={productData.isActive}
                  placeholder='Active?'
                />
              </div>

              {/* ---------------- Right Column ---------------- */}
              <div className='flex flex-col flex-1 gap-6'>
                <FormRhfSelect
                  control={control}
                  name='brandId'
                  label='Brand'
                  options={productData.brand}
                  placeholder='Select Brand'
                  onCreateNew={() => handleDialog("brand")}
                  createNew
                />

                <FormRhfSelect
                  control={control}
                  name='categoryId'
                  label='Category'
                  options={productData.category}
                  placeholder='Select Category'
                  onCreateNew={() => handleDialog("category")}
                  createNew
                />

                <FormRhfSelect
                  control={control}
                  name='subCategoryId'
                  label='Subcategory'
                  options={productData.subCategory}
                  placeholder='Select Subcategory'
                  onCreateNew={() => handleDialog("subCategory")}
                  createNew
                />

                <FormRhfTextarea
                  control={control}
                  name='description'
                  label='Description'
                  placeholder='Enter description'
                  height={125}
                />

                {/* ---------------- Images ---------------- */}
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor='product-images'>
                      Product Images
                    </FieldLabel>
                    <Input
                      id='product-images'
                      type='file'
                      multiple
                      accept='image/*'
                      onChange={(e) => handleImageChange(e.target.files)}
                    />
                    {errors.images && <FieldError errors={[errors.images]} />}
                  </Field>
                </FieldGroup>
                <div className='flex flex-wrap gap-2 mt-2'>
                  {images.map((img, index) => (
                    <div
                      key={img.url} // use url as key for consistent updates
                      className='relative rounded-lg w-12 lg:w-14 h-12 lg:h-14 overflow-hidden'
                    >
                      <Image
                        src={img.url}
                        alt={`Product image ${index + 1}`}
                        fill
                        className='object-cover'
                      />
                      <Button
                        type='button'
                        onClick={() => removeImage(index)}
                        className='top-1 right-1 absolute flex justify-center items-center bg-black/50 hover:bg-black/70 p-0 rounded-full w-6 h-6 text-white hover:text-red-400'
                      >
                        <X className='w-3 h-3' />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ---------------- Submit ---------------- */}
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? (
                <LoadingSpinner text='Creating...' />
              ) : (
                "Create Product"
              )}
            </Button>
          </div>
        </form>
      )}

      {dialogIdentifier === "brand" && isDialogOpen && (
        <ReusableDialog
          dialogTitle='Create New Brand'
          dialogDescription='Brand must offers high-quality products designed with a focus on style, comfort, and durability. It aims to meet customer needs through reliable craftsmanship and modern design.'
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          submitText='Create Brand'
          cancelText='Close'
          isSubmittingText='Branding...'
        >
          <Field>
            <Label>Brand Name</Label>
            <Input type='text' />
          </Field>
        </ReusableDialog>
      )}
      {dialogIdentifier === "category" && isDialogOpen && (
        <ReusableDialog
          dialogTitle='Create New Category'
          dialogDescription='Define a new product category to keep your catalog structured and easy to navigate. Categories help customers quickly find what they are looking for.'
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          submitText='Create Category'
          cancelText='Close'
          isSubmittingText='Categorizing...'
        >
          <Field>
            <Label>Category Name</Label>
          </Field>
          <Field>
            <Input type='text' />
          </Field>
        </ReusableDialog>
      )}
      {dialogIdentifier === "subCategory" && isDialogOpen && (
        <ReusableDialog
          dialogTitle='Create New Subcategory'
          dialogDescription='Define a subcategory to group related products under a main category, making your catalog more structured and user-friendly.'
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          submitText='Create Subcategory'
          cancelText='Close'
          isSubmittingText='SubCategorizing...'
        >
          <Field>
            <Label>Subcategory Name</Label>
          </Field>
          <Field>
            <Input type='text' />
          </Field>
        </ReusableDialog>
      )}
    </>
  );
}
