"use client";

import Image from "next/image";

interface AnimalPawLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: 32,
  md: 40,
  lg: 56,
};

export function AnimalPawLogo({
  size = "md",
  className = ""
}: AnimalPawLogoProps) {
  const dimension = sizeMap[size];

  return (
    <Image
      src="/logo.png"
      alt="Animal Selling"
      width={dimension}
      height={dimension}
      className={className}
      priority
    />
  );
}
