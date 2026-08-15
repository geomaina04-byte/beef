"use client";

import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/blog-data";
import { formatDate } from "@/lib/blog-data";
import CategoryBadge from "./CategoryBadge";

export default function ArticleHeader({ post }: { post: BlogPost }) {
  return (
    <header className="relative">
      <div className="relative h-[56vh] min-h-[380px] w-full overflow-hidden">
        <img src={post.image} alt={post.imageAlt} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-fixed via-charcoal-fixed/50 to-charcoal-fixed/10" />
      </div>

      <div className="container-lux relative -mt-28 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass max-w-3xl rounded-3xl border-cream/10 p-7 sm:p-10"
        >
          <CategoryBadge category={post.category} />
          <h1 className="mt-4 font-display text-3xl font-800 leading-[1.1] text-cream sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-cream/55">
            <span className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal-raised font-mono text-[11px] text-gold-soft">
                {post.author.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </span>
              <span>
                <span className="block text-cream/80">{post.author.name}</span>
                <span className="block text-xs text-cream/40">{post.author.role}</span>
              </span>
            </span>
            <span className="h-1 w-1 rounded-full bg-cream/30" />
            <span>{formatDate(post.date)}</span>
            <span className="h-1 w-1 rounded-full bg-cream/30" />
            <span>{post.readTime}</span>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
