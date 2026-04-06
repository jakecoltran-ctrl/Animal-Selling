"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { AnimalIcon } from "@/components/ui/AnimalIcon";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");
  const [name, setName] = useState("");
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
      }
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();

      // Sign up with Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.user) {
        // Create profile in profiles table
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          email,
          name,
        });

        if (profileError) {
          console.error("Profile error:", profileError);
          // Continue anyway - user is created
        }

        // Store pending quiz data to process after email confirmation
        if (redirectTo === "quiz") {
          const pendingQuizData = localStorage.getItem("pending_quiz_data");
          if (pendingQuizData) {
            // Keep the pending quiz data - it will be processed after email confirmation
            localStorage.setItem("pending_quiz_redirect", "true");

            // Also save to database for cross-device access
            try {
              const { answers, salesContext } = JSON.parse(pendingQuizData);
              await fetch("/api/pending-quiz", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email,
                  quizAnswers: answers,
                  salesContext,
                }),
              });
            } catch (err) {
              console.error("Error saving pending quiz to DB:", err);
            }
          }
        }

        // Check if email confirmation is required (no session means confirmation needed)
        // If session exists, user was auto-confirmed - still send to check-email as fallback
        if (!data.session || !data.user.email_confirmed_at) {
          router.push("/check-email");
        } else {
          // Email was auto-confirmed (Supabase setting disabled), go to dashboard
          router.push("/dashboard");
        }
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err instanceof Error ? err.message : "Failed to create account. Please try again.");
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
            <CardTitle>Create Your Account</CardTitle>
            <CardDescription>
              Start discovering your sales animal today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
                  minLength={6}
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href={redirectTo ? `/login?redirect=${redirectTo}` : "/login"} className="text-primary hover:underline">
                Sign in
              </Link>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    }>
      <SignupForm />
    </Suspense>
  );
}
