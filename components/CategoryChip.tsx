import Link from "next/link";

interface CategoryChipProps {
  href: string;
  label: string;
  active?: boolean;
}

export default function CategoryChip({ href, label, active = false }: CategoryChipProps) {
  return (
    <Link
      href={href}
      className={
        active
          ? "rounded-full bg-sage-700 px-4 py-2 text-sm font-medium text-cream"
          : "rounded-full border border-sage-300 bg-cream px-4 py-2 text-sm font-medium text-sage-700 hover:border-sage-500 hover:text-sage-900"
      }
    >
      {label}
    </Link>
  );
}
