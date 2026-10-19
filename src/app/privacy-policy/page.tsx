import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Landmark Inter Gulf LLC",
  description: "Privacy Policy for Landmark Inter Gulf LLC. Learn how we collect, use, and protect your personal information.",
  alternates: { canonical: "https://www.landmarkgulf.com/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-background">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: January 2025</p>

        <div className="prose prose-sm sm:prose-base max-w-none text-muted-foreground space-y-6">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Information We Collect</h2>
            <p>Landmark Inter Gulf LLC collects the following types of information:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Job Application Data:</strong> Name, email, phone, nationality, experience, certifications, current location, and message when you apply for a position.</li>
              <li><strong>Contact Form Data:</strong> Name, email, company, service interest, and message when you submit an enquiry.</li>
              <li><strong>Automatic Data:</strong> IP address, browser type, and usage data collected automatically when you visit our website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Process and respond to job applications</li>
              <li>Respond to enquiries and provide requested information</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. Data Storage and Security</h2>
            <p>Your data is processed through Web3Forms (a third-party form processing service) and delivered to our email. We take reasonable measures to protect your information from unauthorized access, alteration, or disclosure.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Third-Party Services</h2>
            <p>We use the following third-party services that may collect data:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Web3Forms:</strong> For processing job applications and contact form submissions</li>
              <li><strong>Vercel:</strong> For website hosting and analytics</li>
              <li><strong>Google:</strong> For search engine indexing and analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Cookies</h2>
            <p>Our website does not use tracking cookies. We do not collect behavioral data for advertising purposes.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Request access to your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of communications at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">7. Data Retention</h2>
            <p>We retain job application data for a reasonable period to process applications. Contact form data is retained for follow-up purposes and then deleted.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">8. Children's Privacy</h2>
            <p>Our website is not directed at children under 16. We do not knowingly collect information from children.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">10. Contact Us</h2>
            <p>If you have questions about this Privacy Policy or your personal data, please contact us:</p>
            <p className="mt-2">
              Email: info@landmarkgulf.com<br />
              Website: www.landmarkgulf.com<br />
              Location: Kingdom of Saudi Arabia
            </p>
          </section>

          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">© 2025 Landmark Inter Gulf LLC. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
