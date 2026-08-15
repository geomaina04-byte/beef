import type { ContentBlock } from "@/lib/blog-data";

export default function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="max-w-2xl">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className="mb-6 text-[17px] leading-[1.8] text-cream/75">
                {block.text}
              </p>
            );
          case "heading":
            return (
              <h2 key={i} className="mb-4 mt-10 font-display text-2xl font-700 text-cream">
                {block.text}
              </h2>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="my-8 border-l-2 border-gold/60 pl-6 font-display text-xl italic leading-snug text-cream/90"
              >
                &ldquo;{block.text}&rdquo;
                {block.attribution && (
                  <footer className="mt-3 font-sans text-sm not-italic text-cream/45">
                    — {block.attribution}
                  </footer>
                )}
              </blockquote>
            );
          case "highlight":
            return (
              <div
                key={i}
                className="my-8 rounded-2xl border border-gold/25 bg-charcoal-raised/50 p-6 text-sm leading-relaxed text-gold-soft"
              >
                {block.text}
              </div>
            );
          case "image":
            return (
              <figure key={i} className="my-10 -mx-2 sm:mx-0">
                <div className="overflow-hidden rounded-2xl">
                  <img src={block.src} alt={block.alt} className="w-full object-cover" />
                </div>
                {block.caption && (
                  <figcaption className="mt-3 text-xs text-cream/40">{block.caption}</figcaption>
                )}
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
