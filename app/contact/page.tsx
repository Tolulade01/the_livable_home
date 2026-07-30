import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with The Livable Home for questions, corrections, or partnerships.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-14 md:px-8">
      <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="eyebrow mb-2">Contact</p>
          <h1 className="font-display text-4xl text-sage-900 md:text-5xl">Say hello</h1>
          <p className="mt-5 max-w-sm text-sage-700">
            Question about a post, a room you&apos;re stuck on, or a partnership idea. Send it
            over. I read everything myself.
          </p>

          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="font-semibold text-sage-900">Email</dt>
              <dd className="text-sage-600">
                <a href="mailto:hello@thelivablehome.com" className="hover:text-sage-900">
                  hello@thelivablehome.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-sage-900">Pinterest</dt>
              <dd className="text-sage-600">
                <a href={siteConfig.social.pinterest} target="_blank" rel="noreferrer" className="hover:text-sage-900">
                  @thelivablehome
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-sage-900">Response time</dt>
              <dd className="text-sage-600">A few business days, usually sooner.</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-lg border border-sage-200 bg-cream p-6 shadow-card md:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
