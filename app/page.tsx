import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getFeaturedPosts } from "@/lib/posts";
import { categories } from "@/lib/categories";
import PostCard from "@/components/PostCard";
import NewsletterForm from "@/components/NewsletterForm";
import CategoryChip from "@/components/CategoryChip";

export default function HomePage() {
  const allPosts = getAllPosts();
  const featured = getFeaturedPosts(1)[0] ?? allPosts[0];
  const grid = allPosts.filter((p) => p.slug !== featured?.slug).slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-sage-200 bg-sage-50">
        <div className="mx-auto grid max-w-content gap-10 px-5 py-14 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-8 md:py-20">
          <div>
            <p className="eyebrow mb-4">Room by room, on a real budget</p>
            <h1 className="font-display text-[2.6rem] leading-[1.08] text-sage-900 md:text-6xl">
              A home that feels like yours, one room at a time.
            </h1>
            <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-sage-700">
              Practical styling advice, small-space fixes, and shoppable finds for people
              redecorating a corner at a time, not gutting the whole house.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/blog" className="btn-primary">
                Read the blog
              </Link>
              <Link href="/about" className="btn-outline">
                Meet the writer
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {categories.map((c) => (
                <CategoryChip key={c.slug} href={`/blog/category/${c.slug}`} label={c.shortName} />
              ))}
            </div>
          </div>

          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="pin-card group block overflow-hidden rounded-lg border border-sage-200 bg-cream shadow-card hover:shadow-cardHover"
              style={{ "--pin-rotate": "1deg" } as React.CSSProperties}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-sage-100">
                <Image
                  src={featured.heroImage}
                  alt={featured.heroImageAlt}
                  fill
                  priority
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <p className="eyebrow">Latest post</p>
                <h2 className="mt-1.5 font-display text-2xl text-sage-900">{featured.title}</h2>
                <p className="mt-2 text-sm text-sage-700">{featured.excerpt}</p>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Post grid */}
      <section className="mx-auto max-w-content px-5 py-16 md:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-2">From the blog</p>
            <h2 className="font-display text-3xl text-sage-900 md:text-4xl">Recent posts</h2>
          </div>
          <Link href="/blog" className="hidden text-sm font-semibold text-sage-700 underline decoration-sage-300 underline-offset-4 hover:text-sage-900 md:inline-block">
            View all posts →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {grid.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>

        <Link href="/blog" className="btn-outline mt-8 inline-flex md:hidden">
          View all posts
        </Link>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-content px-5 pb-20 md:px-8">
        <NewsletterForm />
      </section>
    </>
  );
}
