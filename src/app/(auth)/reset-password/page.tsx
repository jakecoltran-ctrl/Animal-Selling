"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { AnimalIcon } from "@/components/ui/AnimalIcon";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // "verifying" while we establish the recovery session, then "ready" or "invalid".
  const [status, setStatus] = useState<"verifying" | "ready" | "invalid">("verifying");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Establish a session from the recovery link.
  useEffect(() => {
    const init = async () => {
      const supabase = createClient();

      const token_hash = searchParams.get("token_hash");
      const type = searchParams.get("type");

      if (token_hash && type) {
        const { error: otpError } = await supabase.auth.verifyOtp({
          token_hash,
          type: type as "recovery" | "email",
        });
        if (otpError) {
          setStatus("invalid");
          return;
        }
        setStatus("ready");
        return;
      }

      // Implicit flow (token in URL hash) — the client picks it up automatically.
      const { data } = await supabase.auth.getUser();
      setStatus(data.user ? "ready" : "invalid");
    };

    init();
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setDone(true);
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch {
      setError("Something went wrong. Please try again.");
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
              <AnimalIcon type="lion" size="lg" variant="head" />
              <AnimalIcon type="penguin" size="lg" variant="head" />
              <AnimalIcon type="retriever" size="lg" variant="head" />
              <AnimalIcon type="beaver" size="lg" variant="head" />
            </div>
            <CardTitle>
              {done ? "Password updated" : status === "invalid" ? "Link expired" : "Set a new password"}
            </CardTitle>
            <CardDescription>
              {done
                ? "You're all set. Redirecting you to your dashboard..."
                : status === "invalid"
                ? "This reset link is invalid or has expired. Request a new one to try again."
                : "Choose a new password for your account."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status === "verifying" && (
              <div className="flex justify-center py-4">
                <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
              </div>
            )}

            {status === "invalid" && (
              <div className="text-center">
                <Button asChild className="w-full">
                  <Link href="/forgot-password">Request a new link</Link>
                </Button>
              </div>
            )}

            {status === "ready" && !done && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    New password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirm" className="text-sm font-medium">
                    Confirm new password
                  </label>
                  <Input
                    id="confirm"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Updating..." : "Update password"}
                </Button>
              </form>
            )}

            {!done && status !== "invalid" && (
              <div className="mt-6 text-center text-sm">
                <Link href="/login" className="text-primary hover:underline">
                  Back to sign in
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
