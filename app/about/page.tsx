import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the writer behind The Livable Home and the honest, budget-real approach behind every post.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-14 md:px-8">
      <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-start">
        <div
          className="pin-card relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-sage-200 shadow-card"
          style={{ "--pin-rotate": "-1deg" } as React.CSSProperties}
        >
          <Image
            src="/images/about-portrait.svg"
            alt={`Portrait placeholder for ${siteConfig.author.name}`}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <p className="eyebrow mb-2">About</p>
          <h1 className="font-display text-4xl text-sage-900 md:text-5xl">
            Hi, I&apos;m {siteConfig.author.name.split(" ")[0]}.
          </h1>

          <div className="prose-post mt-6 max-w-prose">
            <p>
              I&apos;m not a designer. I don&apos;t have a trade discount, a showroom, or a client
              with an unlimited budget. What I have is a decade of redecorating rental apartments
              and one very stubborn 1970s house, one room at a time, mostly on evenings and
              weekends.
            </p>
            <p>
              I started The Livable Home because I got tired of decor content that assumed
              everyone has ten thousand dollars and a blank slate. Most of us don&apos;t. We have
              a couch we&apos;re not ready to replace, a landlord who says no to paint, and a
              weekend to make a room feel better than it did on Friday.
            </p>
            <h2>What you&apos;ll actually find here</h2>
            <p>
              Room-by-room advice that starts with what&apos;s already in the space, not what you
              should buy to replace it. Small-space and rental fixes that won&apos;t cost you your
              deposit. Honest opinions about what&apos;s worth the money and what isn&apos;t, because
              a guide with no point of view isn&apos;t worth your time.
            </p>
            <p>
              When I recommend something, it&apos;s because I used it, tested it, or would put it
              in my own house. When a post includes affiliate links, they&apos;re disclosed
              clearly. You can read the full policy on the{" "}
              <Link href="/affiliate-disclosure">affiliate disclosure page</Link>.
            </p>
            <h2>The short version</h2>
            <p>
              I want your home to feel calm and like you, without pretending that takes no money,
              no time, and no trade-offs. If a post here helps you fix the one corner that&apos;s
              been bothering you for two years, it did its job.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/blog" className="btn-primary">
              Read the blog
            </Link>
            <Link href="/contact" className="btn-outline">
              Get in touch
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <NewsletterForm />
      </div>
    </div>
  );
}
