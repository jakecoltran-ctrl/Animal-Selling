"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { QuizResult, AnimalType } from "@/types";
import { getAnimal } from "@/lib/animal-data";
import { getContextualBlendDescription } from "@/lib/quiz-scoring";
import { getBlendProfile } from "@/lib/report-data";

// Report Components
import { ReportPage } from "@/components/report/ReportPage";
import { CoverPage } from "@/components/report/CoverPage";
import { UniqueProfilePage } from "@/components/report/UniqueProfilePage";
import { ProfileSummary } from "@/components/report/ProfileSummary";
import { PrimaryDeepDive } from "@/components/report/PrimaryDeepDive";
import { SecondaryInfluence } from "@/components/report/SecondaryInfluence";
import { ObjectionHandlingPage } from "@/components/report/ObjectionHandlingPage";
import { BuyerIdentification } from "@/components/report/BuyerIdentification";
import { SellingPlaybookPage } from "@/components/report/SellingPlaybook";
import { TypesComparison } from "@/components/report/TypesComparison";
import { RedFlagsPage } from "@/components/report/RedFlagsPage";
import { SelfCoachingPage } from "@/components/report/SelfCoachingPage";
import { GrowthPlanPage } from "@/components/report/GrowthPlanPage";
import { ThirtyDayPlanPage } from "@/components/report/ThirtyDayPlanPage";
import { TeamPreview } from "@/components/report/TeamPreview";
import { PDFDownload } from "@/components/report/PDFDownload";
import { IndustryTipsPage } from "@/components/report/IndustryTipsPage";

export default function ReportViewPage() {
  const params = useParams();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const reportRef = useRef<HTMLDivElement>(null);
  const totalPages = 15;

  useEffect(() => {
    const stored = localStorage.getItem(`quiz_result_${params.id}`);
    if (stored) {
      setResult(JSON.parse(stored));
    }
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl animate-spin mb-4">📄</div>
          <p className="text-gray-500 dark:text-gray-400">Loading your report...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Report Not Found</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            We couldn&apos;t find your quiz results.
          </p>
          <Link href="/quiz">
            <Button>Take the Quiz Again</Button>
          </Link>
        </div>
      </div>
    );
  }

  const primaryAnimal = getAnimal(result.primaryType);
  const secondaryAnimal = getAnimal(result.secondaryType);

  // Fallback for older quiz results that don't have salesContext
  const salesContext = result.salesContext || {
    sellType: "product" as const,
    customerType: "b2b" as const,
    salesChannel: "outside" as const,
  };

  const blendDescription = getContextualBlendDescription(
    result.primaryType,
    result.secondaryType,
    salesContext
  );
  const blendProfile = getBlendProfile(result.primaryType, result.secondaryType);


  // Navigation
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Sticky Navigation */}
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-sm no-print">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Back Link */}
            <Link
              href={`/quiz/results/${params.id}`}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Results
            </Link>

            {/* Page Navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600 min-w-[80px] text-center">
                Page {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>

            {/* Download PDF */}
            <PDFDownload
              reportRef={reportRef}
              fileName={`animal-selling-${result.primaryType}-report`}
              primaryColor={primaryAnimal.color}
            />
          </div>
        </div>
      </div>

      {/* Report Content - Visible Current Page */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page 1: Cover */}
        {currentPage === 1 && (
          <ReportPage pageNumber={1} totalPages={totalPages}>
            <CoverPage
              primaryAnimal={primaryAnimal}
              secondaryAnimal={secondaryAnimal}
              salesContext={salesContext}
              email={result.email}
              createdAt={result.createdAt}
            />
          </ReportPage>
        )}

        {/* Page 2: Profile Summary */}
        {currentPage === 2 && (
          <ReportPage pageNumber={2} totalPages={totalPages}>
            <ProfileSummary
              primaryAnimal={primaryAnimal}
              secondaryAnimal={secondaryAnimal}
              percentages={result.percentages}
              blendDescription={blendDescription}
              salesContext={salesContext}
            />
          </ReportPage>
        )}

        {/* Page 3: Unique Profile */}
        {currentPage === 3 && (
          <ReportPage pageNumber={3} totalPages={totalPages}>
            <UniqueProfilePage
              scores={result.percentages}
              primaryType={result.primaryType}
              secondaryType={result.secondaryType}
              salesContext={salesContext}
            />
          </ReportPage>
        )}

        {/* Page 4: Primary Deep Dive */}
        {currentPage === 4 && (
          <ReportPage pageNumber={4} totalPages={totalPages}>
            <PrimaryDeepDive
              primaryAnimal={primaryAnimal}
              salesContext={salesContext}
            />
          </ReportPage>
        )}

        {/* Page 5: Secondary Influence */}
        {currentPage === 5 && blendProfile && (
          <ReportPage pageNumber={5} totalPages={totalPages}>
            <SecondaryInfluence
              primaryAnimal={primaryAnimal}
              secondaryAnimal={secondaryAnimal}
              blendProfile={blendProfile}
            />
          </ReportPage>
        )}

        {/* Page 6: Objection Handling */}
        {currentPage === 6 && (
          <ReportPage pageNumber={6} totalPages={totalPages}>
            <ObjectionHandlingPage primaryType={result.primaryType} />
          </ReportPage>
        )}

        {/* Page 7: Buyer Identification */}
        {currentPage === 7 && (
          <ReportPage pageNumber={7} totalPages={totalPages}>
            <BuyerIdentification primaryType={result.primaryType} salesContext={salesContext} />
          </ReportPage>
        )}

        {/* Page 8: Selling Playbook */}
        {currentPage === 8 && (
          <ReportPage pageNumber={8} totalPages={totalPages}>
            <SellingPlaybookPage primaryType={result.primaryType} salesContext={salesContext} />
          </ReportPage>
        )}

        {/* Page 9: Types Comparison */}
        {currentPage === 9 && (
          <ReportPage pageNumber={9} totalPages={totalPages}>
            <TypesComparison primaryType={result.primaryType} />
          </ReportPage>
        )}

        {/* Page 10: Red Flags */}
        {currentPage === 10 && (
          <ReportPage pageNumber={10} totalPages={totalPages}>
            <RedFlagsPage primaryType={result.primaryType} />
          </ReportPage>
        )}

        {/* Page 11: Self-Coaching */}
        {currentPage === 11 && (
          <ReportPage pageNumber={11} totalPages={totalPages}>
            <SelfCoachingPage primaryType={result.primaryType} resultId={result.id} />
          </ReportPage>
        )}

        {/* Page 12: Industry Tips */}
        {currentPage === 12 && (
          <ReportPage pageNumber={12} totalPages={totalPages}>
            <IndustryTipsPage primaryType={result.primaryType} />
          </ReportPage>
        )}

        {/* Page 13: Growth Plan */}
        {currentPage === 13 && (
          <ReportPage pageNumber={13} totalPages={totalPages}>
            <GrowthPlanPage
              primaryType={result.primaryType}
              scores={result.percentages}
              salesContext={salesContext}
            />
          </ReportPage>
        )}

        {/* Page 14: 30-Day Action Plan */}
        {currentPage === 14 && (
          <ReportPage pageNumber={14} totalPages={totalPages}>
            <ThirtyDayPlanPage
              primaryType={result.primaryType}
              secondaryType={result.secondaryType}
            />
          </ReportPage>
        )}

        {/* Page 15: Team Preview */}
        {currentPage === 15 && (
          <ReportPage pageNumber={15} totalPages={totalPages}>
            <TeamPreview primaryType={result.primaryType} />
          </ReportPage>
        )}
      </div>

      {/* Hidden container with ALL pages for PDF generation */}
      <div
        ref={reportRef}
        className="fixed top-0 left-0 w-[900px] pointer-events-none"
        style={{ opacity: 0, zIndex: -9999 }}
        aria-hidden="true"
      >
        <ReportPage pageNumber={1} totalPages={18} forPdf>
          <CoverPage
            primaryAnimal={primaryAnimal}
            secondaryAnimal={secondaryAnimal}
            salesContext={salesContext}
            email={result.email}
            createdAt={result.createdAt}
          />
        </ReportPage>

        <ReportPage pageNumber={2} totalPages={18} forPdf>
          <ProfileSummary
            primaryAnimal={primaryAnimal}
            secondaryAnimal={secondaryAnimal}
            percentages={result.percentages}
            blendDescription={blendDescription}
            salesContext={salesContext}
          />
        </ReportPage>

        <ReportPage pageNumber={3} totalPages={18} forPdf>
          <UniqueProfilePage
            scores={result.percentages}
            primaryType={result.primaryType}
            secondaryType={result.secondaryType}
            salesContext={salesContext}
          />
        </ReportPage>

        <ReportPage pageNumber={4} totalPages={18} forPdf>
          <PrimaryDeepDive
            primaryAnimal={primaryAnimal}
            salesContext={salesContext}
          />
        </ReportPage>

        {blendProfile && (
          <ReportPage pageNumber={5} totalPages={18} forPdf>
            <SecondaryInfluence
              primaryAnimal={primaryAnimal}
              secondaryAnimal={secondaryAnimal}
              blendProfile={blendProfile}
            />
          </ReportPage>
        )}

        <ReportPage pageNumber={6} totalPages={18} forPdf>
          <ObjectionHandlingPage primaryType={result.primaryType} />
        </ReportPage>

        {/* 4 Buyer Identification pages - one for each animal type */}
        <ReportPage pageNumber={7} totalPages={18} forPdf>
          <BuyerIdentification primaryType={result.primaryType} salesContext={salesContext} showBuyerType="lion" hideSelector />
        </ReportPage>

        <ReportPage pageNumber={8} totalPages={18} forPdf>
          <BuyerIdentification primaryType={result.primaryType} salesContext={salesContext} showBuyerType="penguin" hideSelector />
        </ReportPage>

        <ReportPage pageNumber={9} totalPages={18} forPdf>
          <BuyerIdentification primaryType={result.primaryType} salesContext={salesContext} showBuyerType="retriever" hideSelector />
        </ReportPage>

        <ReportPage pageNumber={10} totalPages={18} forPdf>
          <BuyerIdentification primaryType={result.primaryType} salesContext={salesContext} showBuyerType="beaver" hideSelector />
        </ReportPage>

        <ReportPage pageNumber={11} totalPages={18} forPdf>
          <SellingPlaybookPage primaryType={result.primaryType} salesContext={salesContext} />
        </ReportPage>

        <ReportPage pageNumber={12} totalPages={18} forPdf>
          <TypesComparison primaryType={result.primaryType} />
        </ReportPage>

        <ReportPage pageNumber={13} totalPages={18} forPdf>
          <RedFlagsPage primaryType={result.primaryType} />
        </ReportPage>

        <ReportPage pageNumber={14} totalPages={18} forPdf>
          <SelfCoachingPage primaryType={result.primaryType} resultId={result.id} />
        </ReportPage>

        <ReportPage pageNumber={15} totalPages={18} forPdf>
          <IndustryTipsPage primaryType={result.primaryType} />
        </ReportPage>

        <ReportPage pageNumber={16} totalPages={18} forPdf>
          <GrowthPlanPage
            primaryType={result.primaryType}
            scores={result.percentages}
            salesContext={salesContext}
          />
        </ReportPage>

        <ReportPage pageNumber={17} totalPages={18} forPdf>
          <ThirtyDayPlanPage
            primaryType={result.primaryType}
            secondaryType={result.secondaryType}
          />
        </ReportPage>

        <ReportPage pageNumber={18} totalPages={18} forPdf>
          <TeamPreview primaryType={result.primaryType} />
        </ReportPage>
      </div>

      {/* Page Dots Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 no-print">
        <div className="flex items-center gap-1.5 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border dark:border-gray-700">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentPage === page
                  ? "w-5"
                  : "hover:bg-gray-400"
              }`}
              style={{
                backgroundColor:
                  currentPage === page ? primaryAnimal.color : "#d1d5db",
              }}
              aria-label={`Go to page ${page}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
