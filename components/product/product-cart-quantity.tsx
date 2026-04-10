"use client";
import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import React from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface CartInputProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  maxStock?: number;
}

export default function CartInput({
  quantity,
  setQuantity,
  maxStock = 99,
}: CartInputProps) {
  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => (prev < maxStock ? prev + 1 : prev));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // Allow empty string so user can delete and type
    if (val === "") {
      setQuantity(0); // We handle the "0" fix onBlur
      return;
    }

    const num = parseInt(val, 10);
    if (isNaN(num)) return;

    // Clamp values between 1 and maxStock
    if (num > maxStock) {
      setQuantity(maxStock);
    } else {
      setQuantity(num);
    }
  };

  const handleBlur = () => {
    // If user leaves input empty or 0, reset to 1
    if (quantity < 1) {
      setQuantity(1);
    }
  };

  return (
    <div className='flex justify-between items-center bg-muted/50 p-1 border border-border/40 focus-within:border-primary/50 rounded-xl focus-within:ring-1 focus-within:ring-primary/20 w-full max-w-40] transition-all'>
      <Button
        type='button'
        variant='ghost'
        size='icon'
        onClick={handleDecrease}
        disabled={quantity <= 1}
        className='bg-background hover:bg-background disabled:opacity-30 shadow-sm rounded-lg w-8 h-8 hover:text-primary transition-all'
      >
        <Minus className='w-4 h-4' />
      </Button>

      <Input
        type='number'
        value={quantity === 0 ? "" : quantity}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className={cn(
          "bg-transparent border-none focus-visible:ring-0 h-8 font-bold text-base text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]",
          "w-12",
        )}
      />

      <Button
        type='button'
        variant='ghost'
        size='icon'
        onClick={handleIncrease}
        disabled={quantity >= maxStock}
        className='bg-background hover:bg-background disabled:opacity-30 shadow-sm rounded-lg w-8 h-8 hover:text-primary transition-all'
      >
        <Plus className='w-4 h-4' />
      </Button>
    </div>
  );
}
