import type { BlogPost } from "@/lib/blog-data";
import BlogCard from "./BlogCard";

export default function RelatedStories({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="section-pad bg-charcoal-soft">
      <div className="container-lux">
        <div className="mb-10 flex items-center gap-3">
          <span className="h-px w-10 bg-gold/50" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-cream/40">
            Continue Reading
          </span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
