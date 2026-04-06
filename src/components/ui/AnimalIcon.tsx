"use client";

import Image from "next/image";
import { AnimalType } from "@/types";
import { animals } from "@/lib/animal-data";
import { cn } from "@/lib/utils";

const sizeMap = {
  sm: 24,
  md: 36,
  lg: 56,
  xl: 96,
  "2xl": 128,
  "3xl": 160,
} as const;

interface AnimalIconProps {
  type: AnimalType;
  size?: keyof typeof sizeMap | number;
  className?: string;
}

export function AnimalIcon({ type, size = "md", className }: AnimalIconProps) {
  const animal = animals[type];
  const pixelSize = typeof size === "number" ? size : sizeMap[size];

  return (
    <Image
      src={animal.icon}
      alt={`${animal.name} ${animal.emoji}`}
      width={pixelSize}
      height={pixelSize}
      className={cn("inline-block", className)}
      unoptimized
    />
  );
}
