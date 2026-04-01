"use client";

import { useCallback } from "react";

/**
 * Hook that provides a function to scroll an element into view on mobile devices.
 * Helps prevent content from being cut off when interactive elements are clicked/expanded.
 */
export function useScrollIntoView() {
  const scrollIntoViewOnMobile = useCallback((element: HTMLElement | null, delay = 100) => {
    if (!element) return;
    // Only auto-scroll on mobile (< 768px)
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, delay);
    }
  }, []);

  return { scrollIntoViewOnMobile };
}
