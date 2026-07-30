export type CategorySlug =
  | "room-by-room"
  | "small-space-rental"
  | "budget-decor-diy"
  | "style-guides"
  | "shopping-guides"
  | "seasonal-holiday";

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
}

export const categories: Category[] = [
  {
    slug: "room-by-room",
    name: "Room-by-Room Design",
    shortName: "Room-by-Room",
    description:
      "Styling guides for living rooms, bedrooms, kitchens, bathrooms, entryways, and home offices.",
  },
  {
    slug: "small-space-rental",
    name: "Small Space & Rental Solutions",
    shortName: "Small Space & Rentals",
    description:
      "Renter-friendly upgrades, no-drill fixes, and layouts that make small square footage work harder.",
  },
  {
    slug: "budget-decor-diy",
    name: "Budget Decor & DIY",
    shortName: "Budget & DIY",
    description:
      "Affordable finds, high-low dupes, thrifting tips, and weekend projects that don't eat your Saturday.",
  },
  {
    slug: "style-guides",
    name: "Style Guides",
    shortName: "Style Guides",
    description:
      "Deep dives into specific aesthetics: defining elements, color palette, and key pieces for each look.",
  },
  {
    slug: "shopping-guides",
    name: "Shopping Guides & Roundups",
    shortName: "Shopping Guides",
    description:
      "\"Best of\" roundups and seasonal picks, chosen for real rooms and real budgets, not just trend appeal.",
  },
  {
    slug: "seasonal-holiday",
    name: "Seasonal & Holiday Decor",
    shortName: "Seasonal",
    description:
      "Seasonal refreshes and holiday styling that don't require buying a room's worth of new furniture.",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
