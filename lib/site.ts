export const siteConfig = {
  name: "The Livable Home",
  tagline: "A home that feels like yours, one room at a time.",
  description:
    "Room-by-room styling advice, small-space and rental solutions, budget decorating, style deep-dives, and shoppable roundups for real rooms with real budgets.",
  // Update this once a custom domain is attached. Used for canonical URLs,
  // sitemap.xml, robots.txt, and Open Graph tags.
  url: "https://thelivablehome.vercel.app",
  ogImage: "/images/og-default.svg",
  author: {
    name: "Maren Ellis",
    role: "Founder & Writer, The Livable Home",
  },
  social: {
    pinterest: "https://pinterest.com/thelivablehome",
    instagram: "https://instagram.com/thelivablehome",
  },
  // Newsletter is wired to Brevo via app/api/newsletter/route.ts
  newsletter: {
    provider: "Brevo",
    formAction: "/api/newsletter",
  },
};

export type SiteConfig = typeof siteConfig;
