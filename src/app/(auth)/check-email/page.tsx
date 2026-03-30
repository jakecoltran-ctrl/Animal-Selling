"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto border-2 border-white/20 bg-white/10 backdrop-blur">
          <CardHeader className="text-center">
            <div className="text-5xl mb-4">📧</div>
            <div className="text-3xl mb-2">🦁🐧🐕🦫</div>
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

            <div className="space-y-3">
              <p className="text-gray-300">
                Please check your inbox and click the confirmation link to activate your account.
              </p>
              <p className="text-gray-500 text-sm">
                Don&apos;t see it? Check your spam folder.
              </p>
            </div>

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
