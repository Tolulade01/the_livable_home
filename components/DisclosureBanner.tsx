import Link from "next/link";

export default function DisclosureBanner() {
  return (
    <p className="not-prose rounded border border-sage-200 bg-sage-50 px-4 py-3 text-xs leading-relaxed text-sage-600">
      This post may include affiliate links. If you buy something through one, I may earn a small
      commission at no extra cost to you. Full details in the{" "}
      <Link href="/affiliate-disclosure" className="underline decoration-sage-400 underline-offset-2 hover:text-sage-800">
        affiliate disclosure
      </Link>
      .
    </p>
  );
}
