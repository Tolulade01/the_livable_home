import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug, getRelatedPosts, formatDate } from "@/lib/posts";
import { getCategory } from "@/lib/categories";
import { siteConfig } from "@/lib/site";
import { mdxComponents } from "@/components/MDXComponents";
import DisclosureBanner from "@/components/DisclosureBanner";
import NewsletterForm from "@/components/NewsletterForm";
import PostCard from "@/components/PostCard";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${siteConfig.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url,
      type: "article",
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate ?? post.publishDate,
      images: [{ url: post.heroImage, width: 1200, height: 800 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [post.heroImage],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const category = getCategory(post.category);
  const related = getRelatedPosts(post);
  const hasAffiliateLinks = post.content.includes("<ProductLink");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: `${siteConfig.url}${post.heroImage}`,
    datePublished: post.publishDate,
    dateModified: post.updatedDate ?? post.publishDate,
    author: { "@type": "Person", name: siteConfig.author.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <article className="mx-auto max-w-content px-5 py-12 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-prose">
        {category && (
          <Link
            href={`/blog/category/${category.slug}`}
            className="eyebrow inline-block hover:text-sage-800"
          >
            {category.shortName}
          </Link>
        )}
        <h1 className="mt-3 font-display text-4xl leading-tight text-sage-900 md:text-5xl">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-sage-500">
          <span>By {siteConfig.author.name}</span>
          <span aria-hidden>·</span>
          <span>{formatDate(post.publishDate)}</span>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
      </div>

      <div className="relative mx-auto mt-8 aspect-[16/10] w-full max-w-3xl overflow-hidden rounded-lg bg-sage-100 md:mt-10">
        <Image
          src={post.heroImage}
          alt={post.heroImageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 768px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mx-auto mt-10 max-w-prose">
        {hasAffiliateLinks && (
          <div className="mb-8">
            <DisclosureBanner />
          </div>
        )}

        <div className="prose-post">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        <div className="mt-14">
          <NewsletterForm />
        </div>
      </div>

      {related.length > 0 && (
        <div className="mx-auto mt-20 max-w-content">
          <p className="eyebrow mb-2">Keep reading</p>
          <h2 className="font-display text-3xl text-sage-900">More in {category?.shortName}</h2>
          <div className="mt-7 grid grid-cols-2 gap-5 md:grid-cols-3">
            {related.map((p, i) => (
              <PostCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
