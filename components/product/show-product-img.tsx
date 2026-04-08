"use client";
import { CldImage } from "next-cloudinary";
import { ProductImage } from "@/types/product";
import { useState } from "react";

export default function ShowProductImage({ img }: { img: ProductImage[] }) {
  const [currentImgUrl, setCurrentImgUrl] = useState(img[0]?.url);

  if (!img || img.length === 0) {
    return (
      <div className='flex justify-center items-center h-96'>No Image</div>
    );
  }

  function handleMouseIn(url: string) {
    if (currentImgUrl === url) {
      return;
    }
    setCurrentImgUrl(url);
  }

  return (
    <div className='p-4 border border-border rounded-md w-full'>
      <div className='flex flex-row gap-4'>
        {/* Thumbnails */}
        <div className='flex flex-col gap-2'>
          {img.map((item) => (
            <div
              key={item.url}
              className='relative border border-border rounded w-14 h-16 hover:cursor-pointer'
              onMouseEnter={() => handleMouseIn(item.url)}
            >
              <CldImage
                className='object-contain'
                fill
                alt='product image'
                src={item.url}
              />
            </div>
          ))}
        </div>
        {/* Main Image */}
        <div className='relative flex-1 w-full h-96'>
          <CldImage
            className='object-contain'
            fill
            alt='product image'
            src={currentImgUrl}
          />
        </div>
      </div>
    </div>
  );
}
