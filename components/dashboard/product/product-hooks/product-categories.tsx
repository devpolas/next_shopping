"use client";

import { useEffect, useState } from "react";
import { getSubCategories } from "@/lib/actions/product.actions";
import { SubCategory } from "@/types/product";
import { UseFormSetValue } from "react-hook-form";
import { ProductInput } from "../product-create-schema";

export function useProductCategories(
  watchCategory: string,
  setValue: UseFormSetValue<ProductInput>,
) {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  useEffect(() => {
    if (!watchCategory) {
      //eslint-disable-next-line
      setSubCategories([]);
      return;
    }

    let active = true;

    (async () => {
      const response = await getSubCategories(watchCategory);
      if (active && response.success && response.subCategories) {
        setSubCategories(response.subCategories);
      }
    })();

    setValue("subCategoryId", "");
    setValue("subSubCategoryId", "");

    return () => {
      active = false;
    };
  }, [watchCategory, setValue]);

  const allSubCategories = subCategories.map((sc) => ({
    label: sc.name,
    value: sc.id,
  }));

  const allSubSubCategories =
    subCategories
      .find((sc) => sc.id === watchCategory)
      ?.subSubCategories?.map((ssc) => ({
        label: ssc.name,
        value: ssc.id,
      })) || [];

  return {
    subCategories,
    allSubCategories,
    allSubSubCategories,
  };
}
