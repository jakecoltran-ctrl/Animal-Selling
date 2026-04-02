import Link from "next/link";

export function LegalFooter() {
  return (
    <div className="bg-gray-950 border-t border-white/5 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            © 2026 C2 Unlimited LLC. All rights reserved. Animal Selling™ is a brand of C2 Unlimited LLC.
          </p>
          <div className="flex items-center gap-2">
            <Link href="/terms" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
            <span className="text-gray-700">•</span>
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-700">•</span>
            <Link href="/disclaimer" className="hover:text-gray-300 transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
