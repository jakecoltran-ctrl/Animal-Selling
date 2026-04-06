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
                <AnimalIcon type="lion" size="sm" />
                <AnimalIcon type="penguin" size="sm" />
                <AnimalIcon type="retriever" size="sm" />
                <AnimalIcon type="beaver" size="sm" />
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
                  <AnimalIcon type="lion" size="sm" /> Lion - The Closer
                </Link>
              </li>
              <li>
                <Link href="/animals/penguin" className="hover:text-penguin-600 transition-colors flex items-center gap-1">
                  <AnimalIcon type="penguin" size="sm" /> Penguin - The Connector
                </Link>
              </li>
              <li>
                <Link href="/animals/retriever" className="hover:text-retriever-600 transition-colors flex items-center gap-1">
                  <AnimalIcon type="retriever" size="sm" /> Retriever - The Trusted Advisor
                </Link>
              </li>
              <li>
                <Link href="/animals/beaver" className="hover:text-beaver-600 transition-colors flex items-center gap-1">
                  <AnimalIcon type="beaver" size="sm" /> Beaver - The Specialist
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

      </div>
    </footer>
  );
}
