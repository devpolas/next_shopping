"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PlusCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Loading from "@/app/loading";
import LoadingSpinner from "../../spinner/loading-spinner";
import { Heading3 } from "../../typography/typography";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { FormRhfInput } from "../../rhf-input/form-rhf-input";
import { FormRhfSelect } from "../../rhf-input/form-rfh-select";
import FormRhfTextarea from "../../rhf-input/form-rfh-textarea";
import { ReusableDialog } from "../../dialog/dialog";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Badge } from "../../ui/badge";

import { createProduct, isProductExists } from "@/lib/actions/product.actions";
import { Brand, Category } from "@/types/product";
import { namePerfect } from "@/utils/utils";
import {
  productDefaultValues,
  ProductInput,
  productSchema,
} from "./product-create-schema";
import { productOptions } from "./product-static-data";
import { useProductCategoryTree } from "./product-hooks/product-categories";
import { useProductDialog } from "./product-hooks/product-dialog";
import { useProductImages } from "./product-hooks/product-upload-imgs";

// ---------------- Component ----------------
export default function CreateProduct({
  brands,
  categories,
}: {
  brands: Brand[];
  categories: Category[];
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const allBrands = brands.map((b) => ({ label: b.name, value: b.id }));
  const allCategories = categories.map((c) => ({ label: c.name, value: c.id }));

  // ---------------- Form Setup ----------------
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: productDefaultValues,
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
  const images = watch("images") || [];
  const watchCategory = watch("categoryId");
  const watchSubCategory = watch("subCategoryId");

  //category-hook
  const { subCategories, allSubCategories, allSubSubCategories } =
    useProductCategoryTree({
      categoryId: watchCategory,
      subCategoryId: watchSubCategory,
      setValue,
    });

  // dialog hook
  const {
    currentDialog,
    isDialogOpen,
    dialogType,
    isLoading,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    openDialog,
    closeDialog,
    handleDialogSubmit,
  } = useProductDialog(watchCategory, watchSubCategory, setValue);

  const {
    selectedImage,
    handleImagesChange,
    removeImage,
    handleCoverChange,
    removeCoverImage,
    uploadCoverImage,
    uploadProductImages,
  } = useProductImages(images, imagesFieldArray);

  const onSubmit = async (data: ProductInput) => {
    setLoading(true);
    try {
      const exists = await isProductExists(data.name);
      if (exists.success) {
        toast.error("Product already exists");
        return;
      }
      let productCoverImage;
      if (data.coverImage) {
        productCoverImage = await uploadCoverImage(data.coverImage);
      }

      if (!productCoverImage) {
        toast.error("failed to upload product cover photo");
        return;
      }

      const uploadedImages = await uploadProductImages(data.images);
      if (uploadedImages.length === 0) {
        toast.error("Image upload failed");
        return;
      }

      const response = await createProduct({
        ...data,
        isActive: data.isActive === "true",
        isFeatured: data.isFeatured === "true",
        isNew: data.isNew === "true",
        coverImage: productCoverImage,
        images: uploadedImages,
      });
      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Effects ----------------
  useEffect(() => setMounted(true), []);

  if (!mounted) return <Loading />;

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
                  name='gender'
                  control={control}
                  label='Gender'
                  options={productOptions.gender}
                  placeholder='Select Gender'
                />
                <FormRhfSelect
                  name='isFeatured'
                  control={control}
                  label='Featured'
                  options={productOptions.boolean}
                  placeholder='Featured?'
                />
                <FormRhfSelect
                  name='isNew'
                  control={control}
                  label='New'
                  options={productOptions.boolean}
                  placeholder='New?'
                />
                <FormRhfSelect
                  name='isActive'
                  control={control}
                  label='Active'
                  options={productOptions.boolean}
                  placeholder='Active?'
                />

                {/* ---------------- Variants ---------------- */}
                <div className='flex flex-col gap-4'>
                  <div className='flex flex-row items-center gap-2'>
                    <h4 className='font-semibold'>Product Variants</h4>
                    <Badge
                      className='hover:cursor-pointer'
                      onClick={() =>
                        appendVariant({ size: "", color: "", stock: 1 })
                      }
                    >
                      <PlusCircle /> Create New Variant
                    </Badge>
                  </div>
                  {errors.variants && (
                    <p className='text-red-500 text-sm'>Please add variants</p>
                  )}
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
                        {...register(`variants.${index}.stock`, {
                          valueAsNumber: true,
                        })}
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

              <div className='flex flex-col flex-1 gap-6'>
                <FormRhfSelect
                  name='brandId'
                  control={control}
                  label='Brand'
                  options={allBrands}
                  placeholder='Select Brand'
                  createNew
                  onCreateNew={() => openDialog("brand")}
                />
                <FormRhfSelect
                  name='categoryId'
                  control={control}
                  label='Root Category'
                  options={allCategories}
                  placeholder='Select Root Category'
                />

                <FormRhfSelect
                  name='subCategoryId'
                  control={control}
                  label='Category'
                  options={allSubCategories}
                  placeholder='Select Category'
                  createNew
                  onCreateNew={() => openDialog("subcategory")}
                  disabled={!watchCategory}
                />
                <FormRhfSelect
                  name='subSubCategoryId'
                  control={control}
                  label='SubCategory'
                  options={allSubSubCategories}
                  placeholder='Select Subcategory'
                  createNew
                  onCreateNew={() => openDialog("subSubCategory")}
                  disabled={!watchSubCategory}
                />
                <FormRhfTextarea
                  control={control}
                  name='description'
                  label='Description'
                  placeholder='Enter description'
                  height={125}
                />

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor='product-cover'>Cover Image</FieldLabel>
                    <Input
                      id='product-cover'
                      type='file'
                      accept='image/*'
                      onChange={handleCoverChange}
                    />
                    {errors.coverImage && (
                      <FieldError errors={[errors.coverImage]} />
                    )}
                  </Field>
                </FieldGroup>

                {selectedImage && (
                  <div className='relative rounded-lg w-12 lg:w-14 h-12 lg:h-14 overflow-hidden'>
                    <Image
                      src={selectedImage}
                      alt={`Product cover image`}
                      fill
                      className='object-cover'
                    />
                    <Button
                      type='button'
                      onClick={removeCoverImage}
                      className='top-1 right-1 absolute flex justify-center items-center bg-black/50 hover:bg-black/70 p-0 rounded-full w-6 h-6 text-white hover:text-red-400'
                    >
                      <X className='w-3 h-3' />
                    </Button>
                  </div>
                )}

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
                      onChange={(e) => handleImagesChange(e.target.files)}
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

            <Button
              type='submit'
              className='mt-8'
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? (
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
          isSubmitting={isLoading}
          isSubmittingText={currentDialog.submittingText}
        >
          {(dialogType === "subcategory" ||
            dialogType === "subSubCategory") && (
            <Field>
              <Label>Select Root Category</Label>
              <Select
                value={selectedCategory ?? ""}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select Root Category' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {allCategories.map((option, i) => (
                      <SelectItem key={i} value={option.value}>
                        {namePerfect(option.label)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          )}
          {dialogType === "subSubCategory" && (
            <Field>
              <Label>Select Category</Label>
              <Select
                value={selectedSubCategory ?? ""}
                onValueChange={setSelectedSubCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select Category' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {allSubCategories.map((option, i) => (
                      <SelectItem key={i} value={option.value}>
                        {namePerfect(option.label)}
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
