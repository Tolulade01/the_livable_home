interface ProductLinkProps {
  name: string;
  price: string;
  retailer: string;
  href: string;
  description: string;
}

/**
 * Drop this into any MDX post body to render a shoppable product card.
 * Handles affiliate compliance automatically: every outbound link gets
 * rel="sponsored noopener" and a visible "Paid link" tag, per the FTC
 * disclosure requirements referenced in the Affiliate Disclosure page.
 *
 * Usage inside a post's .mdx file:
 * <ProductLink
 *   name="Boucle Lumbar Pillow Cover"
 *   price="$24"
 *   retailer="Target"
 *   href="https://example.com/affiliate-link"
 *   description="The cover that actually looks like the $80 version. Zipper, not envelope back."
 * />
 */
export default function ProductLink({ name, price, retailer, href, description }: ProductLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener"
      className="not-prose group my-6 flex items-start justify-between gap-4 rounded-lg border border-sage-200 bg-sage-50 p-4 no-underline transition-colors hover:border-sage-400 hover:bg-sage-100 md:p-5"
    >
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-display text-lg text-sage-900">{name}</span>
          <span className="rounded-full bg-clay-400/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-clay-500">
            Paid link
          </span>
        </div>
        <p className="mt-1 text-sm text-sage-700">{description}</p>
        <p className="mt-2 text-xs font-medium text-sage-500">{retailer} · {price}</p>
      </div>
      <span className="mt-1 shrink-0 text-sm font-semibold text-sage-700 underline decoration-sage-300 underline-offset-4 group-hover:text-sage-900">
        Shop it →
      </span>
    </a>
  );
}
