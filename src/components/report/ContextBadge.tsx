"use client";

import { SalesContext } from "@/types";

interface ContextBadgeProps {
  salesContext: SalesContext;
  compact?: boolean;
}

export function ContextBadge({ salesContext, compact = false }: ContextBadgeProps) {
  const badges = [
    {
      label: salesContext.sellType === "product" ? "Product" : "Service",
      color: salesContext.sellType === "product" ? "#7c3aed" : "#0891b2",
    },
    {
      label: salesContext.customerType === "b2b" ? "B2B" : "B2C",
      color: salesContext.customerType === "b2b" ? "#059669" : "#d97706",
    },
    {
      label: salesContext.salesChannel === "inside" ? "Inside Sales" : "Outside Sales",
      color: salesContext.salesChannel === "inside" ? "#6366f1" : "#dc2626",
    },
  ];

  if (compact) {
    return (
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {badges.map((badge) => (
          <span
            key={badge.label}
            className="px-2 py-0.5 rounded text-xs font-medium text-white"
            style={{ backgroundColor: badge.color }}
          >
            {badge.label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
      <span className="text-xs text-gray-500 dark:text-gray-400">Your context:</span>
      {badges.map((badge) => (
        <span
          key={badge.label}
          className="px-2.5 py-1 rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: badge.color }}
        >
          {badge.label}
        </span>
      ))}
    </div>
  );
}
