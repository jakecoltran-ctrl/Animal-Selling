"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimalIcon } from "@/components/ui/AnimalIcon";

function GiftSuccessContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const quantity = searchParams.get("quantity");

  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [codes, setCodes] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

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
          setCodes(data.codes || []);
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
  }, [sessionId]);

  const handleCopyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(codes.join("\n"));
    setCopiedCode("all");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-lg mx-auto border-2 border-white/20 bg-white/10 backdrop-blur">
          <CardHeader className="text-center">
            <div className="text-5xl mb-4">
              {status === "verifying" && "⏳"}
              {status === "success" && "🎁"}
              {status === "error" && "😕"}
            </div>
            <div className="flex justify-center gap-1 mb-2">
              <AnimalIcon type="lion" size="lg" />
              <AnimalIcon type="penguin" size="lg" />
              <AnimalIcon type="retriever" size="lg" />
              <AnimalIcon type="beaver" size="lg" />
            </div>
            <CardTitle className="text-white text-2xl">
              {status === "verifying" && "Verifying Payment..."}
              {status === "success" && "Gift Codes Generated!"}
              {status === "error" && "Something Went Wrong"}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {status === "verifying" && "Please wait while we confirm your purchase."}
              {status === "success" && `${codes.length} gift codes are ready for your team!`}
              {status === "error" && errorMessage}
            </CardDescription>
          </CardHeader>
          <CardContent>
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

                {/* Copy All Button */}
                <Button
                  onClick={handleCopyAll}
                  className="w-full text-white mb-4"
                  style={{ background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)" }}
                >
                  {copiedCode === "all" ? "Copied All!" : "Copy All Codes"}
                </Button>

                {/* Codes List */}
                <div className="bg-gray-800/50 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <div className="grid gap-2">
                    {codes.map((code, index) => (
                      <div
                        key={code}
                        className="flex items-center justify-between bg-gray-900/50 rounded px-3 py-2"
                      >
                        <span className="font-mono text-white text-sm">{code}</span>
                        <button
                          onClick={() => handleCopyCode(code)}
                          className="text-xs text-gray-400 hover:text-white transition-colors"
                        >
                          {copiedCode === code ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-gray-400 text-sm text-center">
                  Share these codes with your team members. Each code unlocks one full report.
                </p>

                <Button
                  asChild
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  <Link href={`/dashboard/team/${params.id}`}>Back to Team Dashboard</Link>
                </Button>
              </div>
            )}

            {status === "error" && (
              <div className="space-y-4">
                <p className="text-gray-300 text-sm text-center">
                  If you were charged, please contact support. Otherwise, try again.
                </p>
                <div className="flex flex-col gap-2">
                  <Button
                    asChild
                    className="w-full text-white"
                    style={{ background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)" }}
                  >
                    <Link href={`/dashboard/team/${params.id}`}>Back to Team</Link>
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

export default function GiftSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <GiftSuccessContent />
    </Suspense>
  );
}
