"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ProductInput } from "../product-create-schema";
import { UseFieldArrayReturn } from "react-hook-form";

const IMAGE_SIZE = 5 * 1024 * 1024;

export function useProductImages(
  images: ProductInput["images"],
  imagesFieldArray: UseFieldArrayReturn<ProductInput, "images", "id">,
) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImagesChange = (files: FileList | null) => {
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

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.warning("Please select an image");
      return;
    }

    if (file.size > IMAGE_SIZE) {
      toast.warning("Image size less than 5 MB");
      return;
    }

    setSelectedImage(URL.createObjectURL(file));
  }

  const uploadCoverImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "next_shopping");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData },
    );

    if (!response.ok) {
      throw new Error("Failed to upload cover image");
    }

    const data = await response.json();
    return data.secure_url;
  };

  const uploadProductImages = async (
    productImages: { file: File; url: string }[],
  ) => {
    const uploadedUrls: { url: string }[] = [];
    for (const img of productImages) {
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

  function removeCoverImage() {
    setSelectedImage(null);
  }

  useEffect(() => {
    return () => {
      images?.forEach((img) => URL.revokeObjectURL(img.url));
      if (selectedImage) URL.revokeObjectURL(selectedImage);
    };
  }, [images]);

  return {
    selectedImage,
    handleImagesChange,
    removeImage,
    handleCoverChange,
    removeCoverImage,
    uploadCoverImage,
    uploadProductImages,
  };
}
