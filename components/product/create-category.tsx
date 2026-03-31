"use client";

import { useForm } from "react-hook-form";
import { FormRhfInput } from "../rhf-input/form-rhf-input";
import { CategoryInput } from "@/lib/validators/product-schema";

export default function CreateCategory() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CategoryInput>();

  return (
    <form>
      <div className='flex flex-col gap-6'>
        <FormRhfInput
          name='name'
          control={control}
          label='Product Name'
          type='text'
          placeholder='Enter Product Name'
        />
      </div>
    </form>
  );
}
