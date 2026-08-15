import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ArticleHeader from "@/components/blog/ArticleHeader";
import ArticleBody from "@/components/blog/ArticleBody";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedStories from "@/components/blog/RelatedStories";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog-data";

interface ArticlePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Story not found — BeefTrace" };

  return {
    title: `${post.title} — BeefTrace Stories`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);

  return (
    <main className="relative">
      <Nav />
      <ArticleHeader post={post} />

      <article className="section-pad bg-charcoal">
        <div className="container-lux">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto]">
            <ArticleBody blocks={post.body} />

            <aside className="flex flex-row items-start gap-3 lg:flex-col lg:sticky lg:top-28 lg:h-fit">
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-cream/35 lg:block">
                Share
              </span>
              <ShareButtons title={post.title} />
            </aside>
          </div>

          <div className="mt-16 max-w-2xl border-t border-cream/10 pt-8">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold-soft transition-transform hover:-translate-x-1"
            >
              ← Back to all stories
            </a>
          </div>
        </div>
      </article>

      <RelatedStories posts={related} />
      <Footer />
    </main>
  );
}
