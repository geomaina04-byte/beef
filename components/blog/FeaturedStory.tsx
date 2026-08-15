"use client";

import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/blog-data";
import { formatDate } from "@/lib/blog-data";
import CategoryBadge from "./CategoryBadge";

export default function FeaturedStory({ post }: { post: BlogPost }) {
  return (
    <section id="stories" className="section-pad bg-charcoal">
      <div className="container-lux">
        <div className="mb-10 flex items-center gap-3">
          <span className="h-px w-10 bg-gold/50" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-cream/40">
            Featured Story
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-auto"
          >
            <img src={post.image} alt={post.imageAlt} className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-fixed/50 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            <CategoryBadge category={post.category} className="w-fit" />

            <h2 className="mt-5 font-display text-3xl font-800 leading-tight text-cream sm:text-4xl">
              {post.title}
            </h2>

            <p className="mt-4 text-base leading-relaxed text-cream/65">{post.excerpt}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-cream/45">
              <span>{post.author.name}</span>
              <span className="h-1 w-1 rounded-full bg-cream/30" />
              <span>{formatDate(post.date)}</span>
              <span className="h-1 w-1 rounded-full bg-cream/30" />
              <span>{post.readTime}</span>
            </div>

            <a
              href={`/blog/${post.slug}`}
              className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-charcoal-fixed transition-transform hover:scale-[1.03]"
            >
              Read Full Story
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
