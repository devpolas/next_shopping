"use client";

import { useState } from "react";
import {
  createBrand,
  createSubCategory,
  createSubSubCategory,
} from "@/lib/actions/product.actions";
import { toast } from "sonner";
import { UseFormSetValue } from "react-hook-form";
import { ProductInput } from "../product-create-schema";
import { useRouter } from "next/navigation";

export function useProductDialog(
  watchCategory: string,
  watchSubCategory: string,
  setValue: UseFormSetValue<ProductInput>,
) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<
    "brand" | "subcategory" | "subSubCategory" | ""
  >("");

  const [brandName, setBrandName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subSubCategoryName, setSubSubCategoryName] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [isLoading, setIsLoading] = useState(false);

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
          setIsLoading(false);
          return;
        }
        response = await createSubCategory(selectedCategory, config.value);
      }
      if (dialogType === "subSubCategory") {
        if (!selectedSubCategory) {
          toast.error("Please select a subcategory");
          setIsLoading(false);
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

      setValue("categoryId", "");
      setValue("subCategoryId", "");

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

  const currentDialog = dialogType ? dialogConfig[dialogType] : null;

  return {
    currentDialog,
    isDialogOpen,
    dialogType,
    isLoading,
    brandName,
    setBrandName,
    subCategoryName,
    setSubCategoryName,
    subSubCategoryName,
    setSubSubCategoryName,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    openDialog,
    closeDialog,
    handleDialogSubmit,
  };
}
