"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimalIcon } from "@/components/ui/AnimalIcon";
import { createClient } from "@/lib/supabase/client";
import { generateQuizResult } from "@/lib/quiz-scoring";
import { QuizAnswer, SalesContext } from "@/types";

export default function CheckEmailPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Get the email from sessionStorage (set during signup)
    const storedEmail = sessionStorage.getItem("pending_confirmation_email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (!email) return;

    // Poll every 3 seconds to check if email has been confirmed
    const checkConfirmation = async () => {
      try {
        // Call our API to check if email is confirmed
        const response = await fetch(`/api/check-confirmation?email=${encodeURIComponent(email)}`);
        const data = await response.json();

        if (data.confirmed && data.userId) {
          setChecking(true);

          // Clear the stored email
          sessionStorage.removeItem("pending_confirmation_email");

          // Refresh the session so user is logged in
          const supabase = createClient();
          await supabase.auth.refreshSession();

          // Process pending quiz data if exists (no session required - uses admin API)
          try {
            const pendingResponse = await fetch(`/api/pending-quiz?email=${encodeURIComponent(email)}`);
            if (pendingResponse.ok) {
              const result = await pendingResponse.json();
              if (result.data?.quizAnswers && result.data?.salesContext) {
                const formattedAnswers: QuizAnswer[] = Object.entries(result.data.quizAnswers).map(
                  ([questionId, value]) => ({
                    questionId,
                    value: value as 1 | 2 | 3 | 4 | 5,
                  })
                );

                const quizResult = generateQuizResult(
                  formattedAnswers,
                  result.data.salesContext as SalesContext,
                  email
                );

                // Save to database using admin endpoint (no session required)
                const saveResponse = await fetch("/api/save-quiz-admin", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ userId: data.userId, quizResult }),
                });

                if (saveResponse.ok) {
                  // Delete pending data
                  await fetch(`/api/pending-quiz?email=${encodeURIComponent(email)}`, { method: "DELETE" });

                  // Redirect to quiz results
                  router.push(`/quiz/results/${quizResult.id}`);
                  return;
                }
              }
            }
          } catch (err) {
            console.error("Error processing pending quiz:", err);
          }

          // No pending quiz, go to dashboard
          router.push("/dashboard");
        }
      } catch (err) {
        console.error("Error checking confirmation:", err);
      }
    };

    // Check immediately
    checkConfirmation();

    // Then poll every 3 seconds
    const interval = setInterval(checkConfirmation, 3000);

    return () => clearInterval(interval);
  }, [email, router]);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto border-2 border-white/20 bg-white/10 backdrop-blur">
          <CardHeader className="text-center">
            <div className="text-5xl mb-4">📧</div>
            <div className="flex justify-center gap-1 mb-2">
              <AnimalIcon type="lion" size="lg" variant="head" />
              <AnimalIcon type="penguin" size="lg" variant="head" />
              <AnimalIcon type="retriever" size="lg" variant="head" />
              <AnimalIcon type="beaver" size="lg" variant="head" />
            </div>
            <CardTitle className="text-white text-2xl">Check Your Email</CardTitle>
            <CardDescription className="text-gray-400">
              We&apos;ve sent you a confirmation link
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div
              className="h-1 rounded-full"
              style={{ background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)" }}
            />

            {checking ? (
              <div className="space-y-3">
                <p className="text-gray-300">
                  Email confirmed! Redirecting...
                </p>
                <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto" />
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-gray-300">
                  Please check your inbox and click the confirmation link to activate your account.
                </p>
                <p className="text-gray-500 text-sm">
                  Don&apos;t see it? Check your spam folder.
                </p>
                <p className="text-gray-600 text-xs">
                  This page will automatically redirect once confirmed.
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-white/10">
              <p className="text-gray-500 text-sm mb-4">
                Already confirmed?
              </p>
              <Button
                asChild
                className="w-full text-white"
                style={{ background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)" }}
              >
                <Link href="/login">Go to Login</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
