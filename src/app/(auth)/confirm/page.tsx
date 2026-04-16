"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { generateQuizResult } from "@/lib/quiz-scoring";
import { QuizAnswer, SalesContext } from "@/types";
import { saveQuizResultsToDB } from "@/lib/quiz-sync";
import { AnimalIcon } from "@/components/ui/AnimalIcon";
import { Loader2, PartyPopper, AlertCircle } from "lucide-react";

function ConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const confirmEmail = async () => {
      const token_hash = searchParams.get("token_hash");
      const type = searchParams.get("type");

      if (token_hash && type) {
        const supabase = createClient();
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash,
          type: type as "email" | "signup" | "recovery" | "invite",
        });

        if (error) {
          setStatus("error");
          setMessage(error.message);
        } else {
          setStatus("success");
          setMessage("Your email has been confirmed!");

          // Check for pending quiz data in database
          try {
            const response = await fetch("/api/pending-quiz");
            if (response.ok) {
              const result = await response.json();
              if (result.data?.answers && result.data?.salesContext) {
                const formattedAnswers: QuizAnswer[] = Object.entries(result.data.answers).map(
                  ([questionId, value]) => ({
                    questionId,
                    value: value as 1 | 2 | 3 | 4 | 5,
                  })
                );

                const quizResult = generateQuizResult(
                  formattedAnswers,
                  result.data.salesContext as SalesContext,
                  data.user?.email || ""
                );

                // Save to database
                await saveQuizResultsToDB([quizResult]);

                // Delete pending data
                await fetch("/api/pending-quiz", { method: "DELETE" });

                // Redirect to quiz results
                setTimeout(() => {
                  router.push(`/quiz/results/${quizResult.id}`);
                }, 2000);
                return;
              }
            }
          } catch (err) {
            console.error("Error processing pending quiz data:", err);
          }

          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            router.push("/dashboard");
          }, 3000);
        }
      } else {
        setStatus("error");
        setMessage("Invalid confirmation link.");
      }
    };

    confirmEmail();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto border-2 border-white/20 bg-white/10 backdrop-blur">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {status === "loading" && <Loader2 className="w-12 h-12 animate-spin text-cyan-500" />}
              {status === "success" && <PartyPopper className="w-12 h-12 text-green-500" />}
              {status === "error" && <AlertCircle className="w-12 h-12 text-red-500" />}
            </div>
            <div className="flex justify-center gap-1 mb-2">
              <AnimalIcon type="lion" size="lg" variant="head" />
              <AnimalIcon type="penguin" size="lg" variant="head" />
              <AnimalIcon type="retriever" size="lg" variant="head" />
              <AnimalIcon type="beaver" size="lg" variant="head" />
            </div>
            <CardTitle className="text-white text-2xl">
              {status === "loading" && "Confirming your email..."}
              {status === "success" && "Welcome to the Pack!"}
              {status === "error" && "Confirmation Failed"}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {status === "loading" && "Please wait while we verify your email address."}
              {status === "success" && "Your email has been verified. You're all set!"}
              {status === "error" && message}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            {status === "loading" && (
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
                  Redirecting you to your dashboard...
                </p>
                <Button
                  asChild
                  className="w-full text-white"
                  style={{ background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)" }}
                >
                  <Link href="/dashboard">Go to Dashboard Now</Link>
                </Button>
              </div>
            )}

            {status === "error" && (
              <div className="space-y-4">
                <p className="text-gray-300 text-sm">
                  The confirmation link may have expired or already been used.
                </p>
                <div className="flex flex-col gap-2">
                  <Button
                    asChild
                    className="w-full text-white"
                    style={{ background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)" }}
                  >
                    <Link href="/login">Go to Login</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    <Link href="/signup">Sign Up Again</Link>
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

export default function ConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <ConfirmContent />
    </Suspense>
  );
}
