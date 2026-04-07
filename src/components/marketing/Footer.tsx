import Link from "next/link";
import { AnimalIcon } from "@/components/ui/AnimalIcon";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="flex items-center">
                <AnimalIcon type="lion" size="sm" variant="head" />
                <AnimalIcon type="penguin" size="sm" variant="head" />
                <AnimalIcon type="retriever" size="sm" variant="head" />
                <AnimalIcon type="beaver" size="sm" variant="head" />
              </span>
              <span className="font-bold text-lg">Animal Selling™</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Discover your sales animal and connect better with every customer.
            </p>
          </div>

          {/* Animal Types */}
          <div>
            <h3 className="font-semibold mb-4">Animal Types</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/animals/lion" className="hover:text-lion-600 transition-colors flex items-center gap-1">
                  <AnimalIcon type="lion" size="sm" variant="head" /> Lion - The Closer
                </Link>
              </li>
              <li>
                <Link href="/animals/penguin" className="hover:text-penguin-600 transition-colors flex items-center gap-1">
                  <AnimalIcon type="penguin" size="sm" variant="head" /> Penguin - The Connector
                </Link>
              </li>
              <li>
                <Link href="/animals/retriever" className="hover:text-retriever-600 transition-colors flex items-center gap-1">
                  <AnimalIcon type="retriever" size="sm" variant="head" /> Retriever - The Trusted Advisor
                </Link>
              </li>
              <li>
                <Link href="/animals/beaver" className="hover:text-beaver-600 transition-colors flex items-center gap-1">
                  <AnimalIcon type="beaver" size="sm" variant="head" /> Beaver - The Specialist
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/quiz" className="hover:text-primary transition-colors">
                  Take the Quiz
                </Link>
              </li>
              <li>
                <Link href="/dashboard/team" className="hover:text-primary transition-colors">
                  Team Safari™
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="text-center md:text-left">
              <p>© {new Date().getFullYear()} Animal Selling. All rights reserved.</p>
              <p className="text-xs mt-1">
                All animal illustrations, characters, and related artwork are original creations and proprietary to Animal Selling.
              </p>
            </div>
            <div className="flex gap-4 text-xs">
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Use
              </Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
