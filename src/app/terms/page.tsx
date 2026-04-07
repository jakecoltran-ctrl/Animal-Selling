import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Terms of Use</CardTitle>
            <p className="text-muted-foreground">Last updated: April 2026</p>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <h2 className="text-xl font-semibold mt-6 mb-3">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using Animal Selling (&quot;the Service&quot;), you agree to be bound by these Terms of Use.
              If you do not agree to these terms, please do not use the Service.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">2. Intellectual Property Rights</h2>
            <p className="mb-2">
              All content on this website, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Animal illustrations (Lion, Penguin, Retriever, Beaver characters)</li>
              <li>Logos and branding elements</li>
              <li>Quiz content and methodology</li>
              <li>Text, graphics, and design elements</li>
            </ul>
            <p className="mb-4">
              are <strong>original creations</strong> and the exclusive property of Animal Selling.
              These materials are protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">3. Restrictions on Use</h2>
            <p className="mb-2">You may NOT:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Copy, reproduce, or distribute any animal illustrations or artwork</li>
              <li>Use our animal characters or branding for any commercial purpose</li>
              <li>Modify, create derivative works, or reverse engineer any content</li>
              <li>Remove any copyright or proprietary notices</li>
              <li>Use automated systems to scrape or download content</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">4. Permitted Use</h2>
            <p className="mb-2">
              You ARE permitted to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Take the quiz for personal or professional development</li>
              <li>Share your results on social media (linking back to our site)</li>
              <li>Use insights from your results to improve your sales approach</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">5. User Accounts</h2>
            <p className="mb-4">
              When you create an account, you are responsible for maintaining the confidentiality of your
              login credentials and for all activities under your account.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">6. Quiz Results</h2>
            <p className="mb-4">
              Quiz results are provided for informational and entertainment purposes. They are based on
              self-reported answers and should not be considered professional psychological assessments.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">7. Limitation of Liability</h2>
            <p className="mb-4">
              Animal Selling is provided &quot;as is&quot; without warranties of any kind. We are not liable for
              any damages arising from your use of the Service.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">8. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. Continued use of the Service
              constitutes acceptance of updated terms.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">9. Contact</h2>
            <p className="mb-4">
              For questions about these Terms, please contact us through our website.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
