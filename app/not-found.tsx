import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-content flex-col items-center px-5 py-28 text-center md:px-8">
      <p className="eyebrow mb-3">404</p>
      <h1 className="font-display text-4xl text-sage-900 md:text-5xl">
        This room doesn&apos;t exist yet.
      </h1>
      <p className="mt-4 max-w-md text-sage-700">
        The page you&apos;re looking for moved, never existed, or is still on the mood board.
        Let&apos;s get you somewhere useful.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
        <Link href="/blog" className="btn-outline">
          Browse the blog
        </Link>
      </div>
    </div>
  );
}
