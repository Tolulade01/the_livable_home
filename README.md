# The Livable Home

A Pinterest-style home decor blog built with **Next.js 15** (App Router) and **React 19**. Static
MDX content, sage green design system, built for fast Core Web Vitals, Google/Pinterest SEO, and
day-one affiliate monetization.

Built from `TheLivableHome_Project_Brief.docx` and `TheLivableHome_Writing_Guide.docx`.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 3, sage green token system, Cormorant Garamond + DM Sans |
| Content | MDX files in `/content/posts`, parsed with `gray-matter`, rendered with `next-mdx-remote/rsc` |
| Hosting | GitHub → Vercel (auto-deploy on push to `main`) |
| Images | `next/image`, SVG placeholders included, swap for real WebP photography |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Requires Node 18.18+ (Node 20 LTS recommended).

## Deploying

1. Push this repo to GitHub.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Vercel auto-detects Next.js — no config needed. Every push to `main` deploys automatically.
4. Once you have a custom domain, update `url` in `lib/site.ts` and re-deploy so canonical URLs,
   the sitemap, and Open Graph tags all point to the right place.

## Project structure

```
app/
  page.tsx                        Home
  blog/page.tsx                   Blog Posts (all posts + category chips)
  blog/category/[category]/       Category archive pages
  blog/[slug]/page.tsx            Single post template
  about/page.tsx                  About Me
  contact/page.tsx                Contact
  privacy-policy/page.tsx         Privacy Policy
  affiliate-disclosure/page.tsx   Affiliate Disclosure (FTC compliance)
  not-found.tsx                   404
  sitemap.ts / robots.ts          Auto-generated SEO files
components/                       Header, Footer, PostCard, ProductLink, forms, etc.
content/posts/*.mdx               Blog posts (6 starter posts included)
lib/                              Site config, category taxonomy, post-reading utilities
public/images/                    SVG placeholder art (see "Replacing placeholder images" below)
```

## Adding a new post

1. Create a new file in `content/posts/`, e.g. `content/posts/my-new-post.mdx`.
2. Add frontmatter matching this shape:

```mdx
---
title: "Your Post Title"
slug: "your-post-title"
metaDescription: "17 to 20 words, includes the focus keyword, reads like a real sentence."
excerpt: "One sentence shown on post cards and the blog index."
heroImage: "/images/posts/your-image.svg"
heroImageAlt: "Descriptive alt text"
category: "room-by-room"   # see lib/categories.ts for valid slugs
publishDate: "2026-08-01"
updatedDate: "2026-08-10"  # optional
focusKeyword: "your focus keyword"
featured: false             # true surfaces it in the homepage hero rotation
---

Your content here, in Markdown/MDX. Use ## and ### for headings.
```

3. Save the file. No routing or layout code needed. The post is picked up automatically by
   `lib/posts.ts` and appears on the homepage, `/blog`, its category page, and gets its own
   `/blog/[slug]` route, sitemap entry, and Open Graph tags.

### Valid category slugs

`room-by-room`, `small-space-rental`, `budget-decor-diy`, `style-guides`, `shopping-guides`,
`seasonal-holiday` — defined in `lib/categories.ts`. Add a new one there to expand the taxonomy.

## Adding a shoppable product link

Inside any post's `.mdx` body:

```mdx
<ProductLink
  name="Boucle Lumbar Pillow Cover"
  price="$24"
  retailer="Target"
  href="https://your-affiliate-link.com"
  description="One sentence on why it's worth buying."
/>
```

This renders a styled product card, automatically sets `rel="sponsored noopener"` on the link for
affiliate/SEO compliance, and shows a visible "Paid link" tag. Any post whose body contains a
`<ProductLink>` automatically shows the affiliate disclosure banner near the top — no extra work
needed.

There's also a `<Callout>` component for a styled opinion/aside block, used the same way.

## Replacing placeholder images

Every hero image, the OG share image, the favicon, and the About page portrait are currently
hand-built SVGs in the site's sage/clay palette (`public/images/`), since no real photography was
available to include in this build. They're intentionally simple and on-brand so the site looks
complete today, but they are placeholders, not final assets.

To swap in real photography:

1. Export photos as WebP, add them to `public/images/posts/`.
2. Update the `heroImage` field in each post's frontmatter to point to the new file.
3. Update `ogImage` in `lib/site.ts` and the file at `public/images/og-default.svg` (replace with
   a `.png` or `.jpg` and update the reference) once you have branded social share art.

## Newsletter and contact forms

Both `NewsletterForm` and `ContactForm` are functional client components with local state and
loading/success UI, but they don't send anywhere yet — wiring in a real backend was out of scope
for this build since it depends on which provider you choose. To connect them:

- **Newsletter:** sign up for MailerLite or ConvertKit, get an embedded form action or API key,
  and replace the `setTimeout` placeholder in `components/NewsletterForm.tsx` with a real
  `fetch()` call. `lib/site.ts` has a `newsletter.formAction` field ready for this.
- **Contact form:** create `app/api/contact/route.ts` as a Next.js Route Handler that sends
  through Resend, Postmark, or forwards to Formspree, then point `ContactForm.tsx`'s submit
  handler at it. See `.env.example` for the environment variables this expects.

## SEO features included

- Static HTML for every page (no client-only rendering of content).
- Auto-generated `sitemap.xml` (`app/sitemap.ts`) and `robots.txt` (`app/robots.ts`).
- Per-post Open Graph and Twitter Card metadata, generated from frontmatter.
- `BlogPosting` JSON-LD structured data on every post.
- Clean URLs: `/blog/scandinavian-living-room`, not `/post?id=123`.
- Mobile-first responsive layout throughout.

## What's deliberately out of scope (v1)

Matches Section 10 of the project brief: no user accounts, no comments system, no e-commerce
checkout, no headless CMS. Content lives as MDX files in the repo. Layer a CMS (Sanity/Contentful)
in later by swapping `lib/posts.ts`'s file-reading logic for API calls — the rest of the app
doesn't need to change.

## A note on the build environment

This project was generated in a sandboxed environment without package registry access, so
`npm install` has not been run and the build has not been executed here. The code follows current
Next.js 15 / React 19 / Tailwind 3 conventions closely, but run `npm run build` locally right
after cloning to catch anything environment-specific before your first deploy.
