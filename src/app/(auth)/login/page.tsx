"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { generateQuizResult } from "@/lib/quiz-scoring";
import { QuizAnswer, SalesContext } from "@/types";
import { saveQuizResultsToDB, syncQuizResults } from "@/lib/quiz-sync";
import { AnimalIcon } from "@/components/ui/AnimalIcon";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in AND email confirmed
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user && user.email_confirmed_at) {
        router.push("/dashboard");
      } else if (user && !user.email_confirmed_at) {
        router.push("/check-email");
      }
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      // Check if email is confirmed
      const { data: { user } } = await supabase.auth.getUser();
      if (user && !user.email_confirmed_at) {
        router.push("/check-email");
        return;
      }

      router.refresh();

      // Check if coming from quiz
      if (redirectTo === "quiz") {
        const pendingQuizData = localStorage.getItem("pending_quiz_data");
        if (pendingQuizData) {
          try {
            const { answers, salesContext } = JSON.parse(pendingQuizData) as {
              answers: Record<string, 1 | 2 | 3 | 4 | 5>;
              salesContext: SalesContext;
            };

            const formattedAnswers: QuizAnswer[] = Object.entries(answers).map(
              ([questionId, value]) => ({
                questionId,
                value,
              })
            );

            const result = generateQuizResult(formattedAnswers, salesContext, email);
            localStorage.setItem(`quiz_result_${result.id}`, JSON.stringify(result));
            localStorage.removeItem("pending_quiz_data");

            // Save to database for cross-device sync
            await saveQuizResultsToDB([result]);

            router.push(`/quiz/results/${result.id}`);
            return;
          } catch (err) {
            console.error("Error processing quiz data:", err);
            localStorage.removeItem("pending_quiz_data");
          }
        }
      }

      // Sync any localStorage results to database before going to dashboard
      await syncQuizResults();

      router.push("/dashboard");
    } catch {
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center gap-1 mb-2">
              <AnimalIcon type="lion" size="lg" />
              <AnimalIcon type="penguin" size="lg" />
              <AnimalIcon type="retriever" size="lg" />
              <AnimalIcon type="beaver" size="lg" />
            </div>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your Animal Selling™ profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link href={redirectTo ? `/signup?redirect=${redirectTo}` : "/signup"} className="text-primary hover:underline">
                Sign up
              </Link>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
