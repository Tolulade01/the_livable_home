import Image from "next/image";
import Link from "next/link";
import { Post, formatDate } from "@/lib/posts";
import { getCategory } from "@/lib/categories";

interface PostCardProps {
  post: Post;
  index?: number;
  size?: "default" | "large";
}

export default function PostCard({ post, index = 0, size = "default" }: PostCardProps) {
  const category = getCategory(post.category);
  // Alternate a very slight rotation so the grid reads like a loosely arranged moodboard.
  const rotate = index % 3 === 0 ? "-0.7deg" : index % 3 === 1 ? "0.5deg" : "-0.3deg";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="pin-card group block overflow-hidden rounded-lg border border-sage-200 bg-cream shadow-card hover:shadow-cardHover"
      style={{ "--pin-rotate": rotate } as React.CSSProperties}
    >
      <div className={`relative w-full overflow-hidden bg-sage-100 ${size === "large" ? "aspect-[4/3]" : "aspect-[4/5]"}`}>
        <Image
          src={post.heroImage}
          alt={post.heroImageAlt}
          fill
          sizes={size === "large" ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 25vw, 90vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {category && (
          <span className="absolute left-3 top-3 rounded bg-cream/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-sage-800">
            {category.shortName}
          </span>
        )}
      </div>
      <div className="p-4 md:p-5">
        <p className="text-xs text-sage-500">
          {formatDate(post.publishDate)} · {post.readingMinutes} min read
        </p>
        <h3 className="mt-1.5 font-display text-xl leading-snug text-sage-900 md:text-[1.35rem]">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-sage-700">{post.excerpt}</p>
      </div>
    </Link>
  );
}
