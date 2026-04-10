"use client";

import { useEffect, useMemo, useState } from "react";
import { getSubCategories } from "@/lib/actions/product.actions";
import { SubCategory } from "@/types/product";
import { UseFormSetValue } from "react-hook-form";
import { ProductInput } from "../product-create-schema";

type Props = {
  categoryId?: string;
  subCategoryId?: string;
  setValue: UseFormSetValue<ProductInput>;
};

export function useProductCategoryTree({
  categoryId,
  subCategoryId,
  setValue,
}: Props) {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  // ---------------- Fetch SubCategories ----------------
  useEffect(() => {
    if (!categoryId) {
      //eslint-disable-next-line
      setSubCategories([]);
      return;
    }

    let active = true;

    (async () => {
      const res = await getSubCategories(categoryId);
      if (active && res.success && res.subCategories) {
        setSubCategories(res.subCategories);
      }
    })();

    // reset dependent fields
    setValue("subCategoryId", "");
    setValue("subSubCategoryId", "");

    return () => {
      active = false;
    };
  }, [categoryId, setValue]);

  // ---------------- Reset SubSubCategory when subCategory changes ----------------
  useEffect(() => {
    setValue("subSubCategoryId", "");
  }, [subCategoryId, setValue]);

  // ---------------- Derived Options ----------------
  const allSubCategories = useMemo(() => {
    return subCategories.map((sc) => ({
      label: sc.name,
      value: sc.id,
    }));
  }, [subCategories]);

  const allSubSubCategories = useMemo(() => {
    return (
      subCategories
        .find((sc) => sc.id === subCategoryId)
        ?.subSubCategories?.map((ssc) => ({
          label: ssc.name,
          value: ssc.id,
        })) || []
    );
  }, [subCategories, subCategoryId]);

  return {
    subCategories,
    allSubCategories,
    allSubSubCategories,
  };
}
