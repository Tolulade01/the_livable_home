import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How The Livable Home collects, uses, and protects your information.",
};

const lastUpdated = "July 30, 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-14 md:px-8">
      <div className="mx-auto max-w-prose">
        <p className="eyebrow mb-2">Legal</p>
        <h1 className="font-display text-4xl text-sage-900 md:text-5xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-sage-500">Last updated: {lastUpdated}</p>

        <div className="prose-post mt-8">
          <p>
            This template is provided as a starting point and is not legal advice. Have it
            reviewed by a lawyer before publishing, especially if you serve readers in the EU/UK
            (GDPR) or California (CCPA/CPRA).
          </p>

          <h2>What this policy covers</h2>
          <p>
            This Privacy Policy explains how {siteConfig.name} (&quot;we,&quot; &quot;us&quot;)
            collects, uses, and shares information when you visit {siteConfig.url} or subscribe to
            our newsletter.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>
              <strong>Information you provide.</strong> Your name and email address when you
              subscribe to the newsletter or submit the contact form.
            </li>
            <li>
              <strong>Automatically collected information.</strong> Pages visited, time on site,
              referring pages, browser and device type, and approximate location, gathered through
              analytics tools such as Vercel Analytics and Google Search Console.
            </li>
            <li>
              <strong>Cookies.</strong> Small files used for analytics, remembering preferences,
              and measuring the performance of affiliate and ad partnerships. You can disable
              cookies in your browser settings.
            </li>
          </ul>

          <h2>How we use information</h2>
          <p>We use the information above to:</p>
          <ul>
            <li>Send the newsletter and any downloadable content you request.</li>
            <li>Respond to messages sent through the contact form.</li>
            <li>Understand which content is useful and improve the site.</li>
            <li>Measure the performance of affiliate links and, where applicable, ads.</li>
          </ul>

          <h2>Third-party services</h2>
          <p>
            We use third-party services including our email provider ({siteConfig.newsletter.provider}),
            hosting (Vercel), and analytics tools. These providers have their own privacy policies
            governing how they handle data.
          </p>

          <h2>Affiliate links</h2>
          <p>
            Some posts contain affiliate links. If you click one and make a purchase, we may earn
            a commission at no extra cost to you. See the{" "}
            <a href="/affiliate-disclosure">Affiliate Disclosure</a> page for details.
          </p>

          <h2>Your choices</h2>
          <p>
            You can unsubscribe from the newsletter at any time using the link in any email. To
            request access to or deletion of your personal data, contact us at{" "}
            <a href="mailto:hello@thelivablehome.com">hello@thelivablehome.com</a>.
          </p>

          <h2>Children&apos;s privacy</h2>
          <p>This site is not directed at children under 13, and we do not knowingly collect their information.</p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy from time to time. The &quot;last updated&quot; date at the
            top of this page reflects the most recent revision.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy can go to{" "}
            <a href="mailto:hello@thelivablehome.com">hello@thelivablehome.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
