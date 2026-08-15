"use client";

import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/blog-data";
import { formatDate } from "@/lib/blog-data";
import CategoryBadge from "./CategoryBadge";

export default function BlogCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  return (
    <motion.a
      href={`/blog/${post.slug}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group glass flex flex-col overflow-hidden rounded-2xl border-gold/15 transition-colors hover:border-gold/35"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={post.image}
          alt={post.imageAlt}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-fixed/70 via-transparent to-transparent" />
        <CategoryBadge category={post.category} className="absolute left-3 top-3" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-700 leading-snug text-cream transition-colors group-hover:text-gold-soft">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-cream/60">{post.excerpt}</p>

        <div className="mt-4 flex items-center justify-between border-t border-cream/10 pt-4 text-xs text-cream/45">
          <span>{post.author.name}</span>
          <span>{formatDate(post.date)}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-cream/40">{post.readTime}</span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-gold-soft transition-transform group-hover:translate-x-1">
            Read more →
          </span>
        </div>
      </div>
    </motion.a>
  );
}
