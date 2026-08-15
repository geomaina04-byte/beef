"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, JOURNEY_STAGES, type BlogPost, type Category, type JourneyStage } from "@/lib/blog-data";
import BlogCard from "./BlogCard";

interface StoriesExplorerProps {
  posts: BlogPost[];
}

export default function StoriesExplorer({ posts }: StoriesExplorerProps) {
  const [category, setCategory] = useState<Category | "All">("All");
  const [stage, setStage] = useState<JourneyStage | null>(null);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (stage && p.journeyStage !== stage) return false;
      return true;
    });
  }, [posts, category, stage]);

  const countForStage = (key: JourneyStage) => posts.filter((p) => p.journeyStage === key).length;

  return (
    <section className="section-pad bg-charcoal-soft">
      <div className="container-lux">
        {/* ---- Trace Stories Timeline ---- */}
        <div className="mb-16">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-10 bg-gold/50" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-cream/40">
              Trace Stories Timeline
            </span>
          </div>
          <h2 className="max-w-2xl font-display text-2xl font-700 text-cream sm:text-3xl">
            Every story connects back to the journey.
          </h2>
          <p className="mt-3 max-w-xl text-sm text-cream/55">
            Filter stories by where they sit in the farm-to-plate chain — the same journey every
            BeefTrace record follows.
          </p>

          <div className="relative mt-10">
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-cream/10 md:block" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-7 md:gap-2">
              {JOURNEY_STAGES.map((s, i) => {
                const active = stage === s.key;
                const count = countForStage(s.key);
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setStage(active ? null : s.key)}
                    disabled={count === 0}
                    className="group relative flex flex-col items-center gap-2 text-center disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <span
                      className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border font-mono text-[11px] transition-colors ${
                        active
                          ? "border-gold bg-gold text-charcoal-fixed"
                          : "border-cream/20 bg-charcoal text-cream/60 group-hover:border-gold/50 group-hover:text-gold-soft"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-xs font-semibold transition-colors ${
                        active ? "text-gold-soft" : "text-cream/70"
                      }`}
                    >
                      {s.label}
                    </span>
                    <span className="text-[10px] text-cream/35">
                      {count} {count === 1 ? "story" : "stories"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {stage && (
            <button
              type="button"
              onClick={() => setStage(null)}
              className="mt-6 text-xs font-medium text-gold-soft underline underline-offset-4"
            >
              Clear stage filter
            </button>
          )}
        </div>

        {/* ---- Category filter + grid ---- */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setCategory("All")}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
              category === "All"
                ? "border-gold bg-gold text-charcoal-fixed"
                : "border-cream/15 text-cream/60 hover:border-gold/40 hover:text-gold-soft"
            }`}
          >
            All Stories
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setCategory(c.name)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                category === c.name
                  ? "border-gold bg-gold text-charcoal-fixed"
                  : "border-cream/15 text-cream/60 hover:border-gold/40 hover:text-gold-soft"
              }`}
            >
              <span className="mr-1" aria-hidden="true">{c.emoji}</span>
              {c.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${category}-${stage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-cream/10 bg-charcoal-raised/40 p-12 text-center text-sm text-cream/50"
            >
              No stories match that filter yet — check back soon.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
