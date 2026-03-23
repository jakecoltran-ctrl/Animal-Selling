"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface PDFDownloadProps {
  reportRef: React.RefObject<HTMLDivElement | null>;
  fileName?: string;
  primaryColor?: string;
}

export function PDFDownload({
  reportRef,
  fileName = "animal-selling-report",
  primaryColor = "#3b82f6",
}: PDFDownloadProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!reportRef.current) return;

    setIsGenerating(true);

    try {
      // Get all report pages
      const pages = reportRef.current.querySelectorAll(".report-page");
      const pdf = new jsPDF("p", "mm", "letter"); // 8.5 x 11 inches
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i] as HTMLElement;

        // Capture the page at full height
        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
          onclone: (clonedDoc, element) => {
            element.style.opacity = "1";
          },
        });

        // Add new page if not first
        if (i > 0) {
          pdf.addPage();
        }

        // Calculate scale to fit entire content on one A4 page
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Scale to fit width first
        let finalWidth = pdfWidth;
        let finalHeight = (imgHeight * pdfWidth) / imgWidth;

        // If height exceeds page, scale down to fit height instead
        if (finalHeight > pdfHeight) {
          finalHeight = pdfHeight;
          finalWidth = (imgWidth * pdfHeight) / imgHeight;
        }

        // Center horizontally and vertically
        const xOffset = (pdfWidth - finalWidth) / 2;
        const yOffset = (pdfHeight - finalHeight) / 2;

        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        pdf.addImage(imgData, "JPEG", xOffset, yOffset, finalWidth, finalHeight);
      }

      // Download the PDF
      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isGenerating}
      size="lg"
      className="gap-2 text-white"
      style={{ backgroundColor: primaryColor }}
    >
      {isGenerating ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Generating PDF...
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download PDF Report
        </>
      )}
    </Button>
  );
}
