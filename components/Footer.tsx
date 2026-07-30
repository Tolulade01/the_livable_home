import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { categories } from "@/lib/categories";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-sage-900 text-sage-100">
      <div className="mx-auto max-w-content px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
          <div>
            <span className="font-display text-2xl italic text-cream">{siteConfig.name}</span>
            <p className="mt-3 max-w-xs text-sm text-sage-300">{siteConfig.tagline}</p>
            <div className="mt-5 flex gap-4">
              <a
                href={siteConfig.social.pinterest}
                className="text-sm font-medium text-sage-200 hover:text-cream"
                target="_blank"
                rel="noreferrer"
              >
                Pinterest
              </a>
              <a
                href={siteConfig.social.instagram}
                className="text-sm font-medium text-sage-200 hover:text-cream"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow text-sage-400">Explore</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/blog" className="text-sage-200 hover:text-cream">All posts</Link></li>
              <li><Link href="/about" className="text-sage-200 hover:text-cream">About</Link></li>
              <li><Link href="/contact" className="text-sage-200 hover:text-cream">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-sage-400">Categories</p>
            <ul className="mt-3 space-y-2 text-sm">
              {categories.slice(0, 4).map((c) => (
                <li key={c.slug}>
                  <Link href={`/blog/category/${c.slug}`} className="text-sage-200 hover:text-cream">
                    {c.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-sage-400">Stay in the loop</p>
            <div className="mt-3">
              <NewsletterForm variant="footer" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-sage-700 pt-6 text-xs text-sage-400 md:flex-row md:items-center md:justify-between">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-cream">Privacy Policy</Link>
            <Link href="/affiliate-disclosure" className="hover:text-cream">Affiliate Disclosure</Link>
            <Link href="/contact" className="hover:text-cream">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
