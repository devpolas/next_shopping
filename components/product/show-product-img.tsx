"use client";
import { CldImage } from "next-cloudinary";
import { ProductImage } from "@/types/product";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function ShowProductImage({ img }: { img: ProductImage[] }) {
  const defaultImg = useMemo(() => img?.[0]?.url || "", [img]);
  const [currentImgUrl, setCurrentImgUrl] = useState(defaultImg);

  if (!img || img.length === 0) {
    return (
      <div className='flex justify-center items-center bg-muted border-2 border-dashed rounded-2xl w-full aspect-square'>
        <p className='text-muted-foreground text-sm italic'>
          No Image Available
        </p>
      </div>
    );
  }

  return (
    <div className='flex xl:flex-row-reverse flex-col items-center xl:items-stretch gap-4'>
      <div className='relative flex-1 bg-white shadow-md border rounded-2xl w-full aspect-4/5 sm:aspect-square overflow-hidden'>
        <CldImage
          key={currentImgUrl}
          fill
          src={currentImgUrl}
          alt='Featured product'
          className='p-4 object-contain transition-all animate-in duration-500 fade-in zoom-in-95'
          sizes='(max-width: 768px) 100vw, 50vw'
        />
      </div>

      {/* Thumbnails - Optimized for Mobile Scroll */}
      <div className='flex flex-row xl:flex-col gap-3 pb-2 md:pb-0 lg:overflow-visible overflow-x-auto scrollbar-hide'>
        {img.map((item) => {
          const isActive = currentImgUrl === item.url;
          return (
            <Button
              key={item.url}
              onClick={() => setCurrentImgUrl(item.url)}
              onMouseEnter={() => setCurrentImgUrl(item.url)}
              className={cn(
                "relative border-2 rounded-xl w-16 lg:w-20 h-16 lg:h-20 overflow-hidden transition-all duration-200 shrink-0",
                isActive
                  ? "border-primary ring-4 ring-primary/10"
                  : "border-transparent hover:border-primary/40",
              )}
            >
              <CldImage
                fill
                src={item.url}
                alt='thumbnail'
                className={cn(
                  "object-cover transition-transform duration-300",
                  isActive
                    ? "scale-100"
                    : "scale-110 grayscale-[0.5] hover:grayscale-0",
                )}
                sizes='80px'
              />
            </Button>
          );
        })}
      </div>
    </div>
  );
}
