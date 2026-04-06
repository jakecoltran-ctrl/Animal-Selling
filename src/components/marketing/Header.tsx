"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { AnimalIcon } from "@/components/ui/AnimalIcon";

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
        <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
          <span className="flex items-center">
            <AnimalIcon type="lion" size="sm" variant="head" />
            <AnimalIcon type="penguin" size="sm" variant="head" />
            <AnimalIcon type="retriever" size="sm" variant="head" />
            <AnimalIcon type="beaver" size="sm" variant="head" />
          </span>
          <span className="font-bold text-xl hidden md:inline-block whitespace-nowrap">Animal Selling™</span>
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap">
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

        <div className="flex items-center space-x-4 flex-shrink-0">
          <Link href="/dashboard/team" className="hidden md:block">
            <Button
              className="text-sm text-white press-effect hover-glow whitespace-nowrap"
              style={{
                background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)",
              }}
            >
              Team Safari™
            </Button>
          </Link>
          <Link href="/quiz" className="hidden md:block">
            <Button className="press-effect hover-glow whitespace-nowrap">Take the Quiz</Button>
          </Link>
          {!loading && (
            user ? (
              <Link href="/dashboard" className="hidden md:block">
                <Button variant="ghost" className="press-effect hover-glow whitespace-nowrap">My Dashboard</Button>
              </Link>
            ) : (
              <Link href="/login" className="hidden md:block">
                <Button variant="ghost" className="press-effect hover-glow whitespace-nowrap">Sign In</Button>
              </Link>
            )
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 flex-shrink-0"
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
          <nav className="flex flex-col space-y-3">
            {/* Animal Type Buttons */}
            <p className="text-xs text-center text-muted-foreground">Discover the Sales Animals</p>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/animals/lion" onClick={() => setMobileMenuOpen(false)}>
                <div className="flex items-center justify-center gap-2 p-3 rounded-lg text-white font-medium text-sm" style={{ backgroundColor: "#dc2626" }}>
                  <AnimalIcon type="lion" size="sm" variant="head" /> Lion
                </div>
              </Link>
              <Link href="/animals/penguin" onClick={() => setMobileMenuOpen(false)}>
                <div className="flex items-center justify-center gap-2 p-3 rounded-lg text-white font-medium text-sm" style={{ backgroundColor: "#0891b2" }}>
                  <AnimalIcon type="penguin" size="sm" variant="head" /> Penguin
                </div>
              </Link>
              <Link href="/animals/retriever" onClick={() => setMobileMenuOpen(false)}>
                <div className="flex items-center justify-center gap-2 p-3 rounded-lg text-white font-medium text-sm" style={{ backgroundColor: "#d97706" }}>
                  <AnimalIcon type="retriever" size="sm" variant="head" /> Retriever
                </div>
              </Link>
              <Link href="/animals/beaver" onClick={() => setMobileMenuOpen(false)}>
                <div className="flex items-center justify-center gap-2 p-3 rounded-lg text-white font-medium text-sm" style={{ backgroundColor: "#059669" }}>
                  <AnimalIcon type="beaver" size="sm" variant="head" /> Beaver
                </div>
              </Link>
            </div>
            <hr className="my-1 border-gray-300 dark:border-gray-700" />
            <Link href="/dashboard/team" onClick={() => setMobileMenuOpen(false)}>
              <Button
                className="w-full text-sm text-white"
                style={{
                  background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)",
                }}
              >
                Team Safari™
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
