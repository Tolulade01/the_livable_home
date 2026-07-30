import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sage — the core brand palette. Named by role, not just shade number,
        // so usage stays intentional (e.g. bg-sage-50 for paper, text-ink for body copy).
        sage: {
          50: "#F6F7F2", // paper background
          100: "#EBEEE3",
          200: "#D6DCC6",
          300: "#B9C4A0",
          400: "#9BAB7C", // mid sage, chips / borders
          500: "#7C905E", // primary interactive sage
          600: "#647549", // hover / pressed
          700: "#4F5C3A",
          800: "#3B4530",
          900: "#2B3324", // near-black green, used for body text
        },
        clay: {
          400: "#C68F6B", // single warm accent — used sparingly (badges, active states)
          500: "#B27A56",
        },
        ink: "#2B3324",
        paper: "#F6F7F2",
        cream: "#FBFAF6",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.18em",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        lg: "10px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(43, 51, 36, 0.06), 0 8px 24px -12px rgba(43, 51, 36, 0.18)",
        cardHover: "0 4px 10px rgba(43, 51, 36, 0.10), 0 20px 40px -16px rgba(43, 51, 36, 0.28)",
      },
      maxWidth: {
        content: "1180px",
        prose: "680px",
      },
    },
  },
  plugins: [],
};

export default config;
