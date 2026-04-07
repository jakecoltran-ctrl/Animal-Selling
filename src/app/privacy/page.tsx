import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
            <p className="text-muted-foreground">Last updated: April 2026</p>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <h2 className="text-xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
            <p className="mb-2">We collect the following information:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>Account Information:</strong> Name, email address when you create an account</li>
              <li><strong>Quiz Responses:</strong> Your answers to assessment questions</li>
              <li><strong>Usage Data:</strong> How you interact with our Service</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
            <p className="mb-2">We use your information to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Generate your personalized sales animal results</li>
              <li>Save your quiz history and progress</li>
              <li>Improve our Service and quiz methodology</li>
              <li>Send you important updates about your account</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">3. Data Storage</h2>
            <p className="mb-4">
              Your data is stored securely using industry-standard encryption. We use Supabase
              for authentication and database services, which maintains SOC 2 Type II compliance.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">4. Data Sharing</h2>
            <p className="mb-4">
              We do NOT sell your personal information. We may share data only with:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Service providers who help operate our platform (hosting, analytics)</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">5. Your Rights</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and data</li>
              <li>Export your quiz results</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">6. Cookies</h2>
            <p className="mb-4">
              We use essential cookies to keep you logged in and maintain your session.
              We do not use tracking cookies for advertising purposes.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">7. Children&apos;s Privacy</h2>
            <p className="mb-4">
              Our Service is not intended for children under 13. We do not knowingly collect
              information from children under 13.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">8. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any
              significant changes by posting the new policy on this page.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">9. Contact Us</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy or want to exercise your data rights,
              please contact us through our website.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
