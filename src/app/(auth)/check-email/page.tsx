"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimalIcon } from "@/components/ui/AnimalIcon";
import { createClient } from "@/lib/supabase/client";

export default function CheckEmailPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    // Poll every 3 seconds to check if email has been confirmed
    const checkConfirmation = async () => {
      try {
        // Refresh the session to get latest user data
        const { data: { session }, error } = await supabase.auth.refreshSession();

        if (error) {
          // No session or error - user might need to log in manually
          return;
        }

        if (session?.user?.email_confirmed_at) {
          // Email confirmed! Redirect to dashboard or pending quiz results
          setChecking(true);

          // Check for pending quiz data
          const pendingRedirect = localStorage.getItem("pending_quiz_redirect");
          if (pendingRedirect) {
            localStorage.removeItem("pending_quiz_redirect");
            router.push("/dashboard");
          } else {
            router.push("/dashboard");
          }
        }
      } catch (err) {
        console.error("Error checking confirmation:", err);
      }
    };

    // Check immediately on mount
    checkConfirmation();

    // Then poll every 3 seconds
    const interval = setInterval(checkConfirmation, 3000);

    return () => clearInterval(interval);
  }, [router]);

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
