"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";

import { useState, useRef, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import { CldImage } from "next-cloudinary";
// import css
import "./style.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function Slider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isHover, setIsHover] = useState(false);
  const [isLeft, setIsLeft] = useState<boolean | null>(null);
  const [clicked, setClicked] = useState(false);

  // ✅ state for rendering
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  // ✅ ref for smooth animation target
  const target = useRef({ x: 0, y: 0 });

  // ✅ smooth animation loop
  useEffect(() => {
    let raf: number;

    const animate = () => {
      setCursor((prev) => ({
        x: prev.x + (target.current.x - prev.x) * 0.15,
        y: prev.y + (target.current.y - prev.y) * 0.15,
      }));

      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    target.current = { x, y };

    const leftZone = rect.width * 0.25;
    const rightZone = rect.width * 0.75;

    if (x < leftZone) {
      setIsLeft(true);
    } else if (x > rightZone) {
      setIsLeft(false);
    } else {
      setIsLeft(null);
    }
  };

  const handleClick = () => {
    if (!swiperRef.current || isLeft === null) return;

    setClicked(true);
    setTimeout(() => setClicked(false), 120);

    isLeft ? swiperRef.current.slidePrev() : swiperRef.current.slideNext();
  };

  return (
    <div
      ref={containerRef}
      className='relative mt-4 w-full h-[30vh] sm:h-[35vh] md:h-[40vh] xl:h-[60vh] overflow-hidden cursor-none'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => {
        setIsHover(false);
        setIsLeft(null);
      }}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={30}
        effect='fade'
        pagination={{ clickable: true }}
        modules={[EffectFade, Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className='h-full'
      >
        <SwiperSlide>
          <div className='relative bg-white w-full h-full'>
            <CldImage
              src='https://res.cloudinary.com/db7ar6ox9/image/upload/v1775911976/krywbylh8pm8zzg78785.jpg'
              alt='slider image'
              fill
              className='object-contain'
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='relative bg-white w-full h-full'>
            <CldImage
              src='https://res.cloudinary.com/db7ar6ox9/image/upload/v1773519648/hj6u2xjqyehgy7d8n3x3.png'
              alt='slider image'
              fill
              className='object-contain'
            />
          </div>
        </SwiperSlide>
      </Swiper>

      {/* CUSTOM CURSOR */}
      {isHover && isLeft !== null && (
        <div
          className={`
            hidden md:flex items-center justify-center
            absolute z-50 pointer-events-none
            px-5 py-3 rounded-full
            bg-transparent font-bold backdrop-blur-md text-green-600 border border-green-700 text-2xl
            -translate-x-1/2 -translate-y-1/2
            text-center
            transition-transform duration-150 ease-out
            ${clicked ? "scale-125" : "scale-100"}
          `}
          style={{
            left: cursor.x,
            top: cursor.y,
          }}
        >
          {isLeft ? "<" : ">"}
        </div>
      )}
    </div>
  );
}
