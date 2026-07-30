import Link from "next/link";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-sage-200 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full bg-clay-400 transition-transform group-hover:scale-125"
          />
          <span className="font-display text-2xl italic tracking-wide text-sage-900 md:text-[1.65rem]">
            {siteConfig.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-sage-800 transition-colors hover:text-sage-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/blog" className="btn-outline hidden text-xs md:inline-flex">
          Browse the blog
        </Link>

        {/* Mobile nav: simple always-visible link row to keep the build dependency-free */}
        <nav aria-label="Primary mobile" className="flex items-center gap-4 md:hidden">
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-sage-800"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
