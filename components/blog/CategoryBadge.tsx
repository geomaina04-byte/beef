import { CATEGORIES, type Category } from "@/lib/blog-data";

export default function CategoryBadge({ category, className = "" }: { category: Category; className?: string }) {
  const meta = CATEGORIES.find((c) => c.name === category);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-charcoal-raised/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-soft ${className}`}
    >
      <span aria-hidden="true">{meta?.emoji}</span>
      {category}
    </span>
  );
}
