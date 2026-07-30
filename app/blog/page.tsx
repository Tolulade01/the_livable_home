import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { categories } from "@/lib/categories";
import PostCard from "@/components/PostCard";
import CategoryChip from "@/components/CategoryChip";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Every post from The Livable Home: room-by-room styling, small-space fixes, budget decor, style guides, and shopping roundups.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-content px-5 py-14 md:px-8">
      <p className="eyebrow mb-2">The full archive</p>
      <h1 className="font-display text-4xl text-sage-900 md:text-5xl">Blog Posts</h1>
      <p className="mt-4 max-w-xl text-sage-700">
        Every post, newest first. Browse by category to find advice for the room you&apos;re
        actually working on right now.
      </p>

      <div className="mt-7 flex flex-wrap gap-2.5">
        <CategoryChip href="/blog" label="All posts" active />
        {categories.map((c) => (
          <CategoryChip key={c.slug} href={`/blog/category/${c.slug}`} label={c.shortName} />
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="mt-16 text-sage-600">
          No posts yet. Add an .mdx file to <code className="rounded bg-sage-100 px-1.5 py-0.5">content/posts</code> to get started.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
