import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import CategoryChip from "@/components/CategoryChip";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const posts = getPostsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-content px-5 py-14 md:px-8">
      <p className="eyebrow mb-2">Category</p>
      <h1 className="font-display text-4xl text-sage-900 md:text-5xl">{category.name}</h1>
      <p className="mt-4 max-w-xl text-sage-700">{category.description}</p>

      <div className="mt-7 flex flex-wrap gap-2.5">
        <CategoryChip href="/blog" label="All posts" />
        {categories.map((c) => (
          <CategoryChip key={c.slug} href={`/blog/category/${c.slug}`} label={c.shortName} active={c.slug === category.slug} />
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="mt-16 text-sage-600">No posts in this category yet. Check back soon.</p>
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
