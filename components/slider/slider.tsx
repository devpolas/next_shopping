"use client";

import { useState } from "react";
import Image from "next/image";

import CART_IMAGE from "@/assets/cart_image.jpg";

export default function Slider() {
  const [isHover, setIsHover] = useState(false);
  const [isLeft, setIsLeft] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, width, top } = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - left;
    const y = e.clientY - top;

    setIsLeft(x < width / 2);
    setPosition({ x, y });
  };

  const handleClick = () => {
    if (isLeft) {
      console.log("PREV");
    } else {
      console.log("NEXT");
    }
  };

  return (
    <div
      className='relative mt-2 w-full h-[480px] overflow-hidden cursor-none'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* IMAGE */}
      <Image
        src={CART_IMAGE}
        alt='cart image'
        fill
        className='object-cover'
        priority
      />

      {/* CUSTOM CURSOR */}
      {isHover && (
        <div
          className='z-50 absolute bg-black/50 px-3 py-2 rounded-full text-white text-2xl transition-transform duration-75 pointer-events-none'
          style={{
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {isLeft ? "←" : "→"}
        </div>
      )}
    </div>
  );
}
