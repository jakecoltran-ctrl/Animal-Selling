"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimalIcon } from "@/components/ui/AnimalIcon";

function SuccessContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setErrorMessage("No session ID found. Please try purchasing again.");
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch("/api/stripe/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setStatus("success");
          // Redirect to report after 2 seconds
          setTimeout(() => {
            router.push(`/quiz/results/${params.id}/report`);
          }, 2000);
        } else {
          setStatus("error");
          setErrorMessage(data.error || "Failed to verify payment.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
        setErrorMessage("Something went wrong verifying your payment.");
      }
    };

    verifyPayment();
  }, [sessionId, params.id, router]);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto border-2 border-white/20 bg-white/10 backdrop-blur">
          <CardHeader className="text-center">
            <div className="text-5xl mb-4">
              {status === "verifying" && "⏳"}
              {status === "success" && "🎉"}
              {status === "error" && "😕"}
            </div>
            <div className="flex justify-center gap-1 mb-2">
              <AnimalIcon type="lion" size="lg" variant="head" />
              <AnimalIcon type="penguin" size="lg" variant="head" />
              <AnimalIcon type="retriever" size="lg" variant="head" />
              <AnimalIcon type="beaver" size="lg" variant="head" />
            </div>
            <CardTitle className="text-white text-2xl">
              {status === "verifying" && "Verifying Payment..."}
              {status === "success" && "Payment Successful!"}
              {status === "error" && "Payment Verification Failed"}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {status === "verifying" && "Please wait while we confirm your purchase."}
              {status === "success" && "Your full report is now unlocked!"}
              {status === "error" && errorMessage}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            {status === "verifying" && (
              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            )}

            {status === "success" && (
              <div className="space-y-4">
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)" }}
                />
                <p className="text-gray-300 text-sm">
                  Redirecting you to your full report...
                </p>
                <Button
                  asChild
                  className="w-full text-white"
                  style={{ background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)" }}
                >
                  <Link href={`/quiz/results/${params.id}/report`}>View My Report Now</Link>
                </Button>
              </div>
            )}

            {status === "error" && (
              <div className="space-y-4">
                <p className="text-gray-300 text-sm">
                  If you were charged, please contact support. Otherwise, try again.
                </p>
                <div className="flex flex-col gap-2">
                  <Button
                    asChild
                    className="w-full text-white"
                    style={{ background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)" }}
                  >
                    <Link href={`/quiz/results/${params.id}/upgrade`}>Try Again</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
