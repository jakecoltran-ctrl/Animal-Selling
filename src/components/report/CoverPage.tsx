"use client";

import { AnimalInfo, SalesContext } from "@/types";

interface CoverPageProps {
  primaryAnimal: AnimalInfo;
  secondaryAnimal: AnimalInfo;
  salesContext: SalesContext;
  email?: string;
  createdAt: string;
}

export function CoverPage({
  primaryAnimal,
  secondaryAnimal,
  salesContext,
  email,
  createdAt,
}: CoverPageProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const contextLabels = {
    sellType: salesContext.sellType === "product" ? "Product Sales" : "Service Sales",
    customerType: salesContext.customerType === "b2b" ? "B2B" : "B2C",
    salesChannel:
      salesContext.salesChannel === "inside" ? "Inside Sales" : "Outside Sales",
  };

  return (
    <div className="flex flex-col items-center justify-center text-center relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(${primaryAnimal.color} 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-8">
        {/* Logo/Title */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
            Animal Selling™
          </h2>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Animal Selling™ Assessment
          </h1>
        </div>

        {/* Animal Icon */}
        <div
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full mx-auto mb-6 sm:mb-8 flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
          style={{ backgroundColor: `${primaryAnimal.color}15` }}
        >
          <span className="text-5xl sm:text-7xl md:text-8xl">{primaryAnimal.emoji}</span>
        </div>

        {/* Primary Result */}
        <div className="mb-6 sm:mb-8">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Your Primary Type
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
            style={{ color: primaryAnimal.color }}
          >
            The {primaryAnimal.name}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">{primaryAnimal.title}</p>
        </div>

        {/* Secondary Type Badge */}
        <div className="inline-flex items-center gap-2 sm:gap-3 bg-white dark:bg-gray-800 rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-md mb-8 sm:mb-12 transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Secondary Type:</span>
          <span className="text-xl sm:text-2xl">{secondaryAnimal.emoji}</span>
          <span
            className="font-semibold text-sm sm:text-base"
            style={{ color: secondaryAnimal.color }}
          >
            {secondaryAnimal.name}
          </span>
        </div>

        {/* Context Tags */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 shadow-sm transition-all duration-300 hover:scale-110">
            {contextLabels.sellType}
          </span>
          <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 shadow-sm transition-all duration-300 hover:scale-110">
            {contextLabels.customerType}
          </span>
          <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 shadow-sm transition-all duration-300 hover:scale-110">
            {contextLabels.salesChannel}
          </span>
        </div>

        {/* Report Info */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {email && <p className="mb-1">Prepared for: {email}</p>}
          <p>Generated on {formattedDate}</p>
        </div>
      </div>
    </div>
  );
}
