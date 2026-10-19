import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Landmark Inter Gulf LLC",
  description: "Terms of Service for Landmark Inter Gulf LLC website. Read our terms governing the use of our website and services.",
  alternates: { canonical: "https://www.landmarkgulf.com/terms-of-service" },
  robots: { index: true, follow: true },
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-background">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: January 2025</p>

        <div className="prose prose-sm sm:prose-base max-w-none text-muted-foreground space-y-6">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using the Landmark Inter Gulf LLC website (landmarkgulf.com), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Company Information</h2>
            <p>Landmark Inter Gulf LLC is a Saudi-based company providing integrated solutions in Manpower Supply, Equipment Rental, Industrial Trading, Petro Services and Hospitality Services across the Kingdom of Saudi Arabia.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. Use of Website</h2>
            <p>You may use this website for lawful purposes only. You agree not to use the site to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Submit false or misleading information in job applications or enquiry forms</li>
              <li>Attempt to access unauthorized areas of the website</li>
              <li>Use automated systems to scrape content or data</li>
              <li>Distribute spam or malicious content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Job Applications</h2>
            <p>When submitting a job application through our website, you agree to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Provide accurate and truthful information</li>
              <li>Consent to our processing of your application data</li>
              <li>Acknowledge that submission does not guarantee employment</li>
              <li>Allow us to contact you regarding your application</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Intellectual Property</h2>
            <p>All content on this website, including text, images, logos, and design, is the property of Landmark Inter Gulf LLC. You may not reproduce, distribute, or use any content without prior written permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">6. Service Information</h2>
            <p>We strive to provide accurate information about our services. However, we do not warrant that all information is complete or current. Contact us directly for the most up-to-date service details.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">7. Limitation of Liability</h2>
            <p>Landmark Inter Gulf LLC shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or its services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">8. Changes to Terms</h2>
            <p>We reserve the right to update these Terms of Service at any time. Continued use of the website after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">9. Contact</h2>
            <p>For questions regarding these Terms of Service, please contact us:</p>
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
