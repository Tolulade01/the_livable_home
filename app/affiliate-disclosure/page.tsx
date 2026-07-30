import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "How The Livable Home uses affiliate links and how we choose what to recommend.",
};

const lastUpdated = "July 30, 2026";

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-content px-5 py-14 md:px-8">
      <div className="mx-auto max-w-prose">
        <p className="eyebrow mb-2">Legal</p>
        <h1 className="font-display text-4xl text-sage-900 md:text-5xl">Affiliate Disclosure</h1>
        <p className="mt-3 text-sm text-sage-500">Last updated: {lastUpdated}</p>

        <div className="prose-post mt-8">
          <p>
            The Livable Home is a reader-supported site. Some posts contain affiliate links,
            meaning we may earn a commission if you click through and make a purchase, at no
            extra cost to you. This is disclosed in accordance with the FTC&apos;s guidelines on
            endorsements and testimonials.
          </p>

          <h2>How you can tell</h2>
          <p>
            Any post containing affiliate links shows a short disclosure note near the top of the
            article. Individual affiliate links are also marked with a &quot;Paid link&quot; tag
            where they appear.
          </p>

          <h2>How we choose what to recommend</h2>
          <p>
            We only recommend products we&apos;d use or have used ourselves. A commission never
            decides what gets recommended. If something isn&apos;t worth the money, we say so,
            commission or not.
          </p>

          <h2>Affiliate programs we participate in</h2>
          <p>
            This may include, but is not limited to, the Amazon Associates Program, LTK, ShopStyle
            Collective, and individual retailer affiliate programs. This list will grow as the
            site does.
          </p>

          <h2>Questions</h2>
          <p>
            If you have a question about a specific recommendation, reach out through the{" "}
            <a href="/contact">contact page</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
