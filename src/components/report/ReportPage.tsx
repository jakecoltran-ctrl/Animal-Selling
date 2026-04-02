"use client";

import { ReactNode } from "react";

interface ReportPageProps {
  children: ReactNode;
  pageNumber: number;
  totalPages: number;
  className?: string;
  forPdf?: boolean; // When true, constrains to A4 for PDF generation
}

export function ReportPage({
  children,
  pageNumber,
  totalPages,
  className = "",
  forPdf = false,
}: ReportPageProps) {
  return (
    <div
      className={`report-page bg-white dark:bg-gray-900 relative ${className}`}
      style={{
        pageBreakAfter: "always",
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <div className="flex flex-col">
        <div className="flex-1 p-4 sm:p-6 md:p-10">{children}</div>

        {/* Page Footer */}
        <div className="px-8 md:px-10 pb-6">
          <div className="flex justify-between items-center text-sm text-gray-400 dark:text-gray-500 border-t dark:border-gray-700 pt-4">
            <span>Animal Selling™ Assessment</span>
            <span>
              Page {pageNumber} of {totalPages}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
