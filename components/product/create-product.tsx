"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PlusCircle, X } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";

// ---------------- Zod Schema ----------------
export const productSchema = z.object({
  name: z.string().trim().min(3).max(100),
  description: z.string().trim().min(10).max(1000),
  price: z.number().positive(),
  discountPrice: z.number().positive().optional(),
  gender: z.enum(["men", "women", "unisex"]),
  categoryId: z.string().min(1),
  subCategoryId: z.string().min(1),
  brandId: z.string().optional(),
  images: z
    .array(z.object({ file: z.instanceof(File), url: z.string() }))
    .min(1, "At least one image is required"),
  isFeatured: z.enum(["true", "false"]),
  isNew: z.enum(["true", "false"]),
  isActive: z.enum(["true", "false"]),
  variants: z
    .array(
      z.object({
        size: z.string().min(1, "Size is required"),
        color: z.string().min(1, "Color is required"),
        stock: z.number().min(0, "Stock cannot be negative"),
      }),
    )
    .min(1, "At least one variant is required"),
});

export type ProductInput = z.infer<typeof productSchema>;

// ---------------- Static Data ----------------
const productOptions = {
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

// ---------------- Component ----------------
export default function CreateProduct() {
  const [mounted, setMounted] = useState(false);
  const session = authClient.useSession();

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<
    "brand" | "category" | "subCategory" | ""
  >("");
  const [brandName, setBrandName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    "",
  ); // explicitly a string

  // ---------------- Dialog Config ----------------
  const dialogConfig = {
    brand: {
      title: "Create New Brand",
      description:
        "Brand must offer high-quality products designed with style, comfort, and durability.",
      value: brandName,
      setValue: setBrandName,
      submitText: "Create Brand",
      submittingText: "Branding...",
      label: "Brand Name",
      placeholder: "Enter Brand Name",
    },
    category: {
      title: "Create New Category",
      description:
        "Define a category to keep your catalog structured and easy to navigate.",
      value: categoryName,
      setValue: setCategoryName,
      submitText: "Create Category",
      submittingText: "Categorizing...",
      label: "Category Name",
      placeholder: "Enter Category Name",
    },
    subCategory: {
      title: "Create New Subcategory",
      description:
        "Define a subcategory to group products under a parent category.",
      value: subcategoryName,
      setValue: setSubcategoryName,
      submitText: "Create Subcategory",
      submittingText: "SubCategorizing...",
      label: "Subcategory Name",
      placeholder: "Enter Subcategory Name",
    },
  };

  // ---------------- React Hook Form ----------------
  const {
    register,
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
      variants: [{ size: "", color: "", stock: 0 }],
    },
  });

  const imagesFieldArray = useFieldArray({ control, name: "images" });
  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const price = watch("price");
  const discountPrice = watch("discountPrice");
  const images = watch("images");

  // ---------------- Handlers ----------------
  const handleImageChange = (files: FileList | null) => {
    if (!files) return;
    const remaining = 5 - images.length;
    Array.from(files)
      .slice(0, remaining)
      .forEach((file) =>
        imagesFieldArray.append({ file, url: URL.createObjectURL(file) }),
      );
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index].url);
    imagesFieldArray.remove(index);
  };

  const openDialog = (type: "brand" | "category" | "subCategory") => {
    setDialogType(type);
    setSelectedCategory("");
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogType("");
    setIsDialogOpen(false);
  };

  const handleDialogSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dialogType) return;
    const config = dialogConfig[dialogType];
    if (!config.value.trim()) return;
    console.log(dialogType, ":", config.value);
    config.setValue("");
    closeDialog();
  };

  const onSubmit = async (data: ProductInput) => {
    console.log("Submitting Product:", data);
    alert("Product submitted! Check console for data.");
  };

  useEffect(() => setMounted(true), []);
  if (!mounted || session.isPending) return <Loading />;

  const currentDialog = dialogType ? dialogConfig[dialogType] : null;

  // ---------------- JSX ----------------
  return (
    <>
      {!isDialogOpen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mx-auto 2xl:p-0 px-8 w-full 2xl:w-6xl'
        >
          <Heading3
            text='Create New Product'
            className='mb-8 text-muted-foreground'
          />

          <div className='flex flex-col gap-6'>
            {/* ---------------- Product Info ---------------- */}
            <div className='flex lg:flex-row flex-col gap-6'>
              {/* Left Column */}
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
                  type='number'
                  control={control}
                  label='Price'
                  placeholder='Enter price'
                />
                <FormRhfInput
                  name='discountPrice'
                  type='number'
                  control={control}
                  label='Discount Price'
                  placeholder='Enter discount price'
                />
                {discountPrice && discountPrice >= price && (
                  <p className='text-red-500 text-sm'>
                    Discount must be less than price
                  </p>
                )}
                <FormRhfSelect
                  control={control}
                  name='gender'
                  label='Gender'
                  options={productOptions.gender}
                  placeholder='Select Gender'
                />
                <FormRhfSelect
                  control={control}
                  name='isFeatured'
                  label='Featured'
                  options={productOptions.isFeatured}
                  placeholder='Featured?'
                />
                <FormRhfSelect
                  control={control}
                  name='isNew'
                  label='New'
                  options={productOptions.isNew}
                  placeholder='New?'
                />
                <FormRhfSelect
                  control={control}
                  name='isActive'
                  label='Active'
                  options={productOptions.isActive}
                  placeholder='Active?'
                />

                {/* ---------------- Variants ---------------- */}
                <div className='flex flex-col gap-4'>
                  <div className='flex flex-row items-center gap-2'>
                    <h4 className='font-semibold'>Product Variants</h4>
                    <Badge
                      className='hover:cursor-pointer'
                      onClick={() =>
                        appendVariant({ size: "", color: "", stock: 0 })
                      }
                    >
                      <PlusCircle /> Create New Variant
                    </Badge>
                  </div>
                  {variantFields.map((field, index) => (
                    <div key={field.id} className='flex items-end gap-4'>
                      <Input
                        type='text'
                        {...register(`variants.${index}.size`)}
                        placeholder='Size'
                      />
                      <Input
                        type='text'
                        {...register(`variants.${index}.color`)}
                        placeholder='Color'
                      />
                      <Input
                        type='number'
                        {...register(`variants.${index}.stock`)}
                        placeholder='Stock'
                      />
                      <Button
                        variant='destructive'
                        type='button'
                        onClick={() => removeVariant(index)}
                      >
                        <X />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div className='flex flex-col flex-1 gap-6'>
                <FormRhfSelect
                  control={control}
                  name='brandId'
                  label='Brand'
                  options={productOptions.brand}
                  placeholder='Select Brand'
                  createNew
                  onCreateNew={() => openDialog("brand")}
                />
                <FormRhfSelect
                  control={control}
                  name='categoryId'
                  label='Category'
                  options={productOptions.category}
                  placeholder='Select Category'
                  createNew
                  onCreateNew={() => openDialog("category")}
                />
                <FormRhfSelect
                  control={control}
                  name='subCategoryId'
                  label='Subcategory'
                  options={productOptions.subCategory}
                  placeholder='Select Subcategory'
                  createNew
                  onCreateNew={() => openDialog("subCategory")}
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
                      key={img.url}
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

      {/* ---------------- Dialog ---------------- */}
      {isDialogOpen && currentDialog && (
        <ReusableDialog
          dialogTitle={currentDialog.title}
          dialogDescription={currentDialog.description}
          isOpen={isDialogOpen}
          onOpenChange={closeDialog}
          submitText={currentDialog.submitText}
          cancelText='Close'
          onSubmit={handleDialogSubmit}
          isSubmittingText={currentDialog.submittingText}
        >
          {dialogType === "subCategory" && (
            <Field>
              <Label>Select Category</Label>
              <Select
                value={selectedCategory ?? ""}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select Category' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {productOptions.category.map((option, i) => (
                      <SelectItem key={i} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          )}
          <Field>
            <Label>{currentDialog.label}</Label>
            <Input
              required
              type='text'
              placeholder={currentDialog.placeholder}
              value={currentDialog.value}
              onChange={(e) => currentDialog.setValue(e.target.value)}
            />
          </Field>
        </ReusableDialog>
      )}
    </>
  );
}
