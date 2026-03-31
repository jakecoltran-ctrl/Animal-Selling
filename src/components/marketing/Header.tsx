"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-300 dark:border-gray-700 bg-gray-200/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-200/80 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 relative">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl">🦁🐧🐕🦫</span>
          <span className="font-bold text-xl hidden sm:inline-block">Animal Selling</span>
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
          <Link href="/animals/lion" className="text-sm font-medium text-muted-foreground hover:text-lion-600 transition-colors nav-underline">
            Lion
          </Link>
          <Link href="/animals/penguin" className="text-sm font-medium text-muted-foreground hover:text-penguin-600 transition-colors nav-underline">
            Penguin
          </Link>
          <Link href="/animals/retriever" className="text-sm font-medium text-muted-foreground hover:text-retriever-600 transition-colors nav-underline">
            Retriever
          </Link>
          <Link href="/animals/beaver" className="text-sm font-medium text-muted-foreground hover:text-beaver-600 transition-colors nav-underline">
            Beaver
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/dashboard/team" className="hidden sm:block">
            <Button
              className="text-sm text-white press-effect hover-glow"
              style={{
                background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)",
              }}
            >
              Team Safari
            </Button>
          </Link>
          <Link href="/quiz" className="hidden sm:block">
            <Button className="press-effect hover-glow">Take the Quiz</Button>
          </Link>
          {!loading && (
            user ? (
              <Link href="/dashboard" className="hidden sm:block">
                <Button variant="ghost" className="press-effect hover-glow">My Dashboard</Button>
              </Link>
            ) : (
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" className="press-effect hover-glow">Sign In</Button>
              </Link>
            )
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-900 px-4 py-4">
          <nav className="flex flex-col space-y-4">
            <Link href="/animals/lion" className="text-sm font-medium text-muted-foreground hover:text-lion-600" onClick={() => setMobileMenuOpen(false)}>
              Lion - The Closer
            </Link>
            <Link href="/animals/penguin" className="text-sm font-medium text-muted-foreground hover:text-penguin-600" onClick={() => setMobileMenuOpen(false)}>
              Penguin - The Connector
            </Link>
            <Link href="/animals/retriever" className="text-sm font-medium text-muted-foreground hover:text-retriever-600" onClick={() => setMobileMenuOpen(false)}>
              Retriever - The Trusted Advisor
            </Link>
            <Link href="/animals/beaver" className="text-sm font-medium text-muted-foreground hover:text-beaver-600" onClick={() => setMobileMenuOpen(false)}>
              Beaver - The Specialist
            </Link>
            <hr className="my-2" />
            <Link href="/dashboard/team" onClick={() => setMobileMenuOpen(false)}>
              <Button
                className="w-full text-sm text-white press-effect"
                style={{
                  background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)",
                }}
              >
                Team Safari
              </Button>
            </Link>
            <Link href="/quiz" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full">Take the Quiz</Button>
            </Link>
            {!loading && (
              user ? (
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">My Dashboard</Button>
                </Link>
              ) : (
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
