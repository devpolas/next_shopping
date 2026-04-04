"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PlusCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
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

import {
  createBrand,
  createProduct,
  createSubCategory,
  createSubSubCategory,
  getSubCategories,
  isProductExists,
} from "@/lib/actions/product.actions";
import { Brand, Category, SubCategory, SubSubCategory } from "@/types/product";
import { namePerfect } from "@/utils/utils";

// ---------------- Zod Schema ----------------
export const productSchema = z.object({
  name: z.string().trim().min(3).max(100),
  description: z.string().trim().min(10).max(1000),
  price: z.number().positive(),
  discountPrice: z.number().positive().optional(),
  gender: z.enum(["men", "women", "unisex"]),
  categoryId: z.string().min(1),
  subCategoryId: z.string().min(1),
  subSubCategoryId: z.string().optional(),
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

// ---------------- Default Values ----------------
const productDefaultValues: ProductInput = {
  name: "",
  description: "",
  price: 0,
  discountPrice: undefined,
  gender: "men",
  categoryId: "",
  subCategoryId: "",
  subSubCategoryId: "",
  brandId: "",
  isFeatured: "false",
  isNew: "false",
  isActive: "true",
  images: [],
  variants: [{ size: "", color: "", stock: 1 }],
};

// ---------------- Static Options ----------------
const productOptions = {
  gender: [
    { label: "Men", value: "men" },
    { label: "Women", value: "women" },
    { label: "Unisex", value: "unisex" },
  ],
  boolean: [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ],
};

// ---------------- Component ----------------
export default function CreateProduct({
  brands,
  categories,
}: {
  brands: Brand[];
  categories: Category[];
}) {
  const router = useRouter();
  const session = authClient.useSession();
  const [mounted, setMounted] = useState(false);

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<
    "brand" | "subcategory" | "subSubCategory" | ""
  >("");
  const [brandName, setBrandName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subSubCategoryName, setSubSubCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    "",
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<
    string | undefined
  >("");

  const [isLoading, setIsLoading] = useState(false);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const allCategories = categories.map((c) => ({ label: c.name, value: c.id }));

  const allBrands = brands.map((b) => ({ label: b.name, value: b.id }));

  const allSubCategories = subCategories.map((sc) => ({
    label: sc.name,
    value: sc.id,
  }));

  const allSubSubCategories = subCategories
    .flatMap((sc) => sc.subSubCategories || [])
    .map((ssc) => ({
      label: ssc.name,
      value: ssc.id,
    }));

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
    subcategory: {
      title: "Create New Category",
      description:
        "Define a category to keep your catalog structured and easy to navigate.",
      value: subCategoryName,
      setValue: setSubCategoryName,
      submitText: "Create Category",
      submittingText: "Categorizing...",
      label: "Category Name",
      placeholder: "Enter Category Name",
    },
    subSubCategory: {
      title: "Create New Subcategory",
      description:
        "Define a subcategory to group products under a parent subcategory.",
      value: subSubCategoryName,
      setValue: setSubSubCategoryName,
      submitText: "Create Subcategory",
      submittingText: "SubCategorizing...",
      label: "Subcategory Name",
      placeholder: "Enter Subcategory Name",
    },
  };

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
  const images = watch("images");
  const watchCategory = watch("categoryId");
  const watchSubCategory = watch("subCategoryId");

  // ---------------- Effects ----------------
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!watchCategory) {
      setSubCategories([]);
      return;
    }

    async function fetchSubcategory() {
      const response = await getSubCategories(watchCategory);
      if (response.success && response.subCategories) {
        setSubCategories(response.subCategories);
      }
    }

    fetchSubcategory();
    setValue("subCategoryId", "");
  }, [watchCategory, setValue]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => images.forEach((img) => URL.revokeObjectURL(img.url));
  }, [images]);

  // ---------------- Handlers ----------------
  const handleImageChange = (files: FileList | null) => {
    if (!files) return;
    const remaining = 5 - images.length;
    if (remaining <= 0) {
      toast.error("Maximum 5 images allowed");
      return;
    }

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

  const openDialog = (type: "brand" | "subcategory" | "subSubCategory") => {
    setDialogType(type);
    if (type === "subcategory") {
      setSelectedCategory(watchCategory || "");
    }
    if (type === "subSubCategory") {
      setSelectedSubCategory(watchSubCategory || "");
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogType("");
    setIsDialogOpen(false);
  };

  const handleDialogSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!dialogType) return;
    const config = dialogConfig[dialogType];
    if (!config.value.trim()) return;

    setIsLoading(true);
    try {
      let response;
      if (dialogType === "brand") {
        response = await createBrand(config.value);
      }
      if (dialogType === "subcategory") {
        if (!selectedCategory) {
          toast.error("Please select a category");
          return;
        }
        response = await createSubCategory(selectedCategory, config.value);
      }
      if (dialogType === "subSubCategory") {
        if (!selectedSubCategory) {
          toast.error("Please select a subcategory");
          return;
        }
        response = await createSubSubCategory(
          selectedSubCategory,
          config.value,
        );
      }

      if (!response?.success) {
        toast.error(response?.message || "Failed to create");
        return;
      }

      router.refresh();
      toast.success("Created successfully");
      config.setValue("");
      closeDialog();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImages = async (images: { file: File; url: string }[]) => {
    const uploadedUrls: { url: string }[] = [];
    for (const img of images) {
      const formData = new FormData();
      formData.append("file", img.file);
      formData.append("upload_preset", "next_shopping");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData },
      );

      if (!response.ok) throw new Error("Failed to upload image");

      const data = await response.json();
      uploadedUrls.push({ url: data.secure_url });
    }
    return uploadedUrls;
  };

  const onSubmit = async (data: ProductInput) => {
    setIsLoading(true);
    try {
      const exists = await isProductExists(data.name);
      if (exists.success) {
        toast.error("Product already exists");
        return;
      }

      const uploadedImages = await uploadImages(data.images);
      if (uploadedImages.length === 0) {
        toast.error("Image upload failed");
        return;
      }

      const response = await createProduct({
        ...data,
        isActive: data.isActive === "true",
        isFeatured: data.isFeatured === "true",
        isNew: data.isNew === "true",
        images: uploadedImages,
      });
      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      router.push("/dashboard/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

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
                  disabled={!watchCategory}
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

            <Button type='submit' disabled={isSubmitting || isLoading}>
              {isSubmitting || isLoading ? (
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
