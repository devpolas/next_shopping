"use client";

import { useForm } from "react-hook-form";
import { FormRhfInput } from "../rhf-input/form-rhf-input";
import { ProductInput, productSchema } from "@/lib/validators/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading3 } from "../typography/typography";
import { FormRhfSelect } from "../rhf-input/form-rfh-select";
import FormRhfTextarea from "../rhf-input/form-rfh-textarea";
import FormRhfFile from "../rhf-input/form-rfh-file";
import { Button } from "../ui/button";

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
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      discountPrice: 0,
      gender: undefined,
      categoryId: "",
      subCategoryId: "",
      brandId: "",
      isFeatured: undefined,
      isNew: undefined,
      isActive: undefined,
      variants: [],
    },
  });

  async function handelCreateProduct(formData: ProductInput) {
    console.log(formData);
  }

  return (
    <form
      onSubmit={handleSubmit(handelCreateProduct)}
      className='mx-auto p-8 w-full md:w-3xl lg:w-4xl xl:w-6xl'
    >
      <Heading3
        text='Create New Product'
        className={"mb-8 text-muted-foreground"}
      />
      <div className='flex flex-col gap-6'>
        <div className='flex md:flex-row flex-col gap-6'>
          <div className='flex flex-col flex-1 gap-6'>
            <FormRhfInput
              name='name'
              control={control}
              label='Product Name'
              type='text'
              placeholder='Enter Product Name'
            />
            <FormRhfInput
              name='price'
              control={control}
              label='Product Price'
              type='number'
              placeholder='Product Price'
            />
            <FormRhfInput
              name='discountPrice'
              control={control}
              label='Discount Price'
              type='number'
              placeholder='Discount Price'
            />
            <FormRhfSelect
              control={control}
              label='Gender'
              name='gender'
              options={productData.gender}
              placeholder='Please select gender'
            />
            <FormRhfSelect
              control={control}
              label='Featured'
              name='isFeatured'
              options={productData.isFeatured}
              placeholder='Please select featured status'
              isBoolean={true}
            />
            <FormRhfSelect
              control={control}
              label='New'
              name='isNew'
              options={productData.isNew}
              placeholder='Please select new status'
              isBoolean={true}
            />
            <FormRhfSelect
              control={control}
              label='Active'
              name='isActive'
              options={productData.isActive}
              placeholder='Please select active status'
              isBoolean={true}
            />
          </div>

          <div className='flex flex-col flex-1 gap-6'>
            <FormRhfSelect
              control={control}
              label='Product Brand'
              name='brandId'
              options={productData.brand}
              placeholder='Please select brand'
              createNew={true}
            />
            <FormRhfSelect
              control={control}
              label='Product Category'
              name='categoryId'
              options={productData.category}
              placeholder='Please select category'
              createNew={true}
            />
            <FormRhfSelect
              control={control}
              label='Product Subcategory'
              name='subCategoryId'
              options={productData.subCategory}
              placeholder='Please select subcategory'
              createNew={true}
            />

            <FormRhfFile
              control={control}
              label='Product Image'
              name='images'
            />

            <FormRhfTextarea
              control={control}
              label='Product Description'
              placeholder='Please provide product description'
              name='description'
              height={125}
            />
          </div>
        </div>
        <button type='submit'>Create Product</button>
      </div>
    </form>
  );
}
