/**
 * BeefTrace Stories — data layer.
 *
 * Content lives here rather than scattered across components so the blog
 * index, the Trace Stories Timeline, and individual article pages all read
 * from one source of truth. Swap in a CMS later by keeping this same shape.
 *
 * Images are reused from the site's existing photography (public/journey,
 * public/poster) rather than stock imagery — same farm-to-plate stages
 * already used in the homepage Journey section.
 */

export type JourneyStage =
  | "farm"
  | "health"
  | "transport"
  | "processing"
  | "distribution"
  | "retail"
  | "consumer";

export const JOURNEY_STAGES: { key: JourneyStage; label: string; tag: string }[] = [
  { key: "farm", label: "Farm", tag: "Born & registered" },
  { key: "health", label: "Health", tag: "Vaccination & checkups" },
  { key: "transport", label: "Transport", tag: "Sale & movement" },
  { key: "processing", label: "Processing", tag: "Slaughter & inspection" },
  { key: "distribution", label: "Distribution", tag: "Cut, packed, QR-coded" },
  { key: "retail", label: "Retail", tag: "On the shelf" },
  { key: "consumer", label: "Consumer", tag: "One scan, full story" },
];

export type Category =
  | "Farmers"
  | "Livestock Journey"
  | "Technology"
  | "Consumer Trust"
  | "Sustainability"
  | "Company Updates";

export const CATEGORIES: { name: Category; emoji: string }[] = [
  { name: "Farmers", emoji: "🌱" },
  { name: "Livestock Journey", emoji: "🐄" },
  { name: "Technology", emoji: "🔬" },
  { name: "Consumer Trust", emoji: "🛒" },
  { name: "Sustainability", emoji: "🌍" },
  { name: "Company Updates", emoji: "🏢" },
];

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "highlight"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export interface Author {
  name: string;
  role: string;
}

export interface BlogPost {
  slug: string;
  category: Category;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  author: Author;
  date: string; // ISO
  readTime: string;
  journeyStage?: JourneyStage;
  featured?: boolean;
  body: ContentBlock[];
}

const FIELD_DESK: Author = { name: "BeefTrace Field Desk", role: "Farmer Stories" };
const TECH_DESK: Author = { name: "BeefTrace Technology Desk", role: "Product & Engineering" };
const CONSUMER_DESK: Author = { name: "BeefTrace Consumer Desk", role: "Trust & Transparency" };
const EDITORIAL: Author = { name: "BeefTrace Editorial", role: "Company Updates" };

export const POSTS: BlogPost[] = [
  {
    slug: "small-farm-to-digital-future",
    category: "Farmers",
    title: "From Small Farm to Digital Future: How Kenyan Farmers Are Embracing Traceability",
    excerpt:
      "For generations, a farmer's word was the only record a calf ever had. Today, that same animal gets a digital identity the moment it's born — and the farmers behind it are the ones driving the change.",
    image: "/journey/born.jpg",
    imageAlt: "Newborn calf with an RFID ear tag being registered on the farm",
    author: FIELD_DESK,
    date: "2026-06-02",
    readTime: "6 min read",
    journeyStage: "farm",
    featured: true,
    body: [
      {
        type: "paragraph",
        text: "Every BeefTrace record starts in the same place: a farm, a calf, and a farmer holding a phone that, for many, is newer than the tractor parked behind them. Registration takes under two minutes — a photo, a birth date, a tag number — but what it unlocks lasts the animal's entire life.",
      },
      {
        type: "paragraph",
        text: "That two-minute habit is the hardest part to build. Not because the technology is difficult, but because it asks farmers to trust that a digital record will matter more than it costs to create. Across the counties where BeefTrace is rolling out, that trust is being earned one verified sale at a time — buyers are starting to pay a premium for animals with a complete history, and word travels fast at the market.",
      },
      {
        type: "quote",
        text: "My father kept records in a notebook that got wet twice and burned once. My son will never lose his herd's history to weather.",
        attribution: "A Boran cattle farmer in Nakuru County, on registering his herd",
      },
      {
        type: "heading",
        text: "Why this matters beyond the farm gate",
      },
      {
        type: "paragraph",
        text: "A digital birth record is the first link in a chain that eventually reaches a shopper's phone at a supermarket shelf. Without it, that chain simply doesn't exist — no vaccination history to check, no transport route to verify, no way to prove the animal was raised the way it's claimed to have been.",
      },
      {
        type: "image",
        src: "/journey/health.jpg",
        alt: "Veterinarian vaccinating an animal with a tablet logging the health record",
        caption: "The same digital record grows with the animal — every vet visit attaches automatically.",
      },
      {
        type: "highlight",
        text: "Farmers who register early aren't just adopting new software — they're building the traceable herd history that buyers are increasingly asking for before they'll pay full price.",
      },
      {
        type: "paragraph",
        text: "None of this replaces the farmer's judgment — it just gives that judgment a paper trail nobody can argue with.",
      },
    ],
  },
  {
    slug: "inside-a-vaccination-round",
    category: "Livestock Journey",
    title: "Inside a Vaccination Round: What Health Records Actually Protect",
    excerpt:
      "A vet's tablet now does as much work as her syringe. Here's what gets logged during a routine health check — and why every entry matters months later, far from the farm.",
    image: "/journey/health.jpg",
    imageAlt: "Veterinarian vaccinating an animal with a tablet logging the health record",
    author: FIELD_DESK,
    date: "2026-06-10",
    readTime: "5 min read",
    journeyStage: "health",
    body: [
      {
        type: "paragraph",
        text: "A vaccination round looks routine from the outside: a vet, a crush, a line of animals. What's changed is what happens the moment the needle comes out — the vet logs the vaccine batch, the dose, and the date directly against that animal's digital record, before moving to the next one.",
      },
      {
        type: "paragraph",
        text: "It sounds like a small addition to an already-busy day. In practice, it's the difference between a health claim anyone can make and a health record anyone can check.",
      },
      {
        type: "heading",
        text: "Where this record travels",
      },
      {
        type: "paragraph",
        text: "That single entry doesn't stay on the farm. It follows the animal through sale, transport, and processing — so a buyer three counties away, or a food safety inspector at a processing plant, can see the exact same history the farm vet recorded months earlier.",
      },
      {
        type: "quote",
        text: "Disease doesn't respect county lines. Neither should the record of how we're keeping ahead of it.",
        attribution: "Field veterinarian, BeefTrace partner network",
      },
      {
        type: "highlight",
        text: "A complete vaccination history is often the single biggest factor in whether a buyer trusts an animal's asking price.",
      },
    ],
  },
  {
    slug: "one-scan-complete-confidence",
    category: "Technology",
    title: "One Scan, Complete Confidence: How QR Traceability Actually Works",
    excerpt:
      "Behind every QR code on a BeefTrace pack is a chain of verified events — born, vaccinated, transported, inspected, packed. Here's what happens in the half-second after you scan.",
    image: "/poster/beeftrace-poster-web.jpg",
    imageAlt: "BeefTrace QR traceability poster showing the scan-to-history flow",
    author: TECH_DESK,
    date: "2026-06-18",
    readTime: "7 min read",
    journeyStage: "consumer",
    body: [
      {
        type: "paragraph",
        text: "Scan a BeefTrace QR code and the phone does something that used to take a supply-chain audit: it pulls together every event logged against that pack's animal ID — birth, health checks, transport, processing, packaging — and lays it out in order, verified.",
      },
      {
        type: "heading",
        text: "What 'verified' actually means",
      },
      {
        type: "paragraph",
        text: "Every event in that timeline is written once, by the party responsible for it, at the time it happened — a vet logs a vaccination, a transporter logs a route, a processor logs an inspection. Nobody downstream can edit an earlier entry; they can only add to the record. That's what makes the scan trustworthy: it isn't a summary someone wrote afterward, it's the actual sequence of what happened.",
      },
      {
        type: "image",
        src: "/poster/beeftrace-poster-web.jpg",
        alt: "Phone scanning a BeefTrace QR code and displaying the animal's verified history",
      },
      {
        type: "quote",
        text: "The QR code isn't the product. It's a window into a record that already existed — we just made it visible.",
        attribution: "BeefTrace Technology Desk",
      },
      {
        type: "highlight",
        text: "Every scan event is itself logged — so a retailer can see exactly how many shoppers checked a batch before it sold out.",
      },
      {
        type: "paragraph",
        text: "The goal was never to make traceability look complicated. It's to make trust take half a second.",
      },
    ],
  },
  {
    slug: "why-that-supermarket-scan-matters",
    category: "Consumer Trust",
    title: "Why That Supermarket Scan Matters More Than You Think",
    excerpt:
      "Standing at a shelf wondering where your meat actually came from isn't a small question anymore — it's one a QR code can answer in seconds.",
    image: "/journey/retail.jpg",
    imageAlt: "Packaged beef on a retail shelf with QR-coded origin labels",
    author: CONSUMER_DESK,
    date: "2026-06-24",
    readTime: "4 min read",
    journeyStage: "retail",
    body: [
      {
        type: "paragraph",
        text: "Have you ever stood at a supermarket shelf and wondered where the meat you're buying actually came from? Where the animal was raised, what journey it took, whether it was inspected and declared safe, whether it was vaccinated and healthy?",
      },
      {
        type: "paragraph",
        text: "Those aren't idle questions — they're exactly what a BeefTrace scan is built to answer, in the time it takes to unlock a phone.",
      },
      {
        type: "heading",
        text: "What you're actually trusting",
      },
      {
        type: "paragraph",
        text: "Every pack on a BeefTrace-enabled shelf carries a code linked to one specific animal's history — not a batch average, not a marketing claim. Farm, health record, transport route, processing date, all attached to that pack.",
      },
      {
        type: "highlight",
        text: "Transparency, accountability, food safety, and consumer trust aren't slogans here — they're literally the four things a scan proves, in order, every time.",
      },
      {
        type: "quote",
        text: "I used to just hope the label was true. Now I check.",
        attribution: "A shopper scanning a pack at a Nairobi retailer",
      },
    ],
  },
  {
    slug: "hidden-cost-of-an-untraceable-supply-chain",
    category: "Sustainability",
    title: "The Hidden Cost of an Untraceable Supply Chain",
    excerpt:
      "When a shipment's history can't be verified, the cost doesn't disappear — it just moves downstream, onto the farmer, the retailer, or the shopper who never sees it coming.",
    image: "/journey/transport.jpg",
    imageAlt: "Livestock transport truck loaded with cattle at sunset",
    author: FIELD_DESK,
    date: "2026-05-14",
    readTime: "6 min read",
    journeyStage: "transport",
    body: [
      {
        type: "paragraph",
        text: "An untraceable supply chain doesn't look broken from the outside. Trucks still move, markets still clear, shelves still get stocked. The cost of not knowing where something came from only shows up later — in a recall nobody can scope properly, in a price a fair farmer can't prove they deserve, in a shopper's trust that erodes a little more with every unanswered question.",
      },
      {
        type: "heading",
        text: "Where the gaps actually are",
      },
      {
        type: "paragraph",
        text: "Movement is where traceability has historically been weakest. An animal can change hands two or three times between farm and processor, and each handoff has traditionally been a paper trail at best — easy to lose, easier to dispute.",
      },
      {
        type: "quote",
        text: "GPS logs the route from farm to market to slaughterhouse, in real time. That single change closes most of the gap.",
        attribution: "BeefTrace Field Desk",
      },
      {
        type: "highlight",
        text: "A verifiable transport record protects everyone in the chain simultaneously — the farmer's price, the transporter's reputation, and the buyer's certainty.",
      },
      {
        type: "paragraph",
        text: "Sustainability conversations tend to focus on emissions and land use. But a supply chain that can't account for itself is its own kind of waste — of trust, of fair pricing, of the effort every honest link in the chain already put in.",
      },
    ],
  },
  {
    slug: "beeftrace-joins-jhub-africa",
    category: "Company Updates",
    title: "BeefTrace Joins JHUB Africa's Innovation Cohort",
    excerpt:
      "A milestone for the team: BeefTrace is now part of JHUB Africa's program supporting Kenyan founders building technology for real problems, not just pitch decks.",
    image: "/videos/platform-demo-poster.jpg",
    imageAlt: "BeefTrace platform dashboard preview",
    author: EDITORIAL,
    date: "2026-04-28",
    readTime: "3 min read",
    journeyStage: "consumer",
    body: [
      {
        type: "paragraph",
        text: "We're glad to share that BeefTrace has joined JHUB Africa's innovation cohort — a program built around a simple idea: Kenyan founders solving Kenyan problems deserve real infrastructure, not just encouragement.",
      },
      {
        type: "paragraph",
        text: "For a small team, this kind of program is less about the badge and more about the room it puts you in — other founders wrestling with the same distribution, trust, and adoption problems, and mentors who've actually shipped in this market before.",
      },
      {
        type: "highlight",
        text: "Empowering Africa through innovation, for a sustainable future — the cohort's mission lines up with why BeefTrace exists in the first place.",
      },
      {
        type: "paragraph",
        text: "More on what this means for the roadmap soon. For now: thank you to everyone at JHUB Africa for the vote of confidence, and to every farmer and partner who made BeefTrace worth backing.",
      },
    ],
  },
  {
    slug: "from-slaughterhouse-to-shelf",
    category: "Livestock Journey",
    title: "From Slaughterhouse to Shelf: Why Processing Records Matter",
    excerpt:
      "The moment an animal becomes a product is also the moment traceability is easiest to lose. Here's how a carcass ID keeps the record intact.",
    image: "/journey/slaughter.jpg",
    imageAlt: "Meat inspector reviewing carcasses in a processing facility",
    author: FIELD_DESK,
    date: "2026-05-30",
    readTime: "5 min read",
    journeyStage: "processing",
    body: [
      {
        type: "paragraph",
        text: "Processing is the point where an animal's individual identity is at the highest risk of getting lost — one animal becomes many cuts, many packs, many separate items on a shelf. If the link back to the source animal breaks here, it breaks everywhere downstream.",
      },
      {
        type: "paragraph",
        text: "A carcass ID assigned at post-mortem inspection is what keeps that link intact. Every cut that comes off that carcass inherits the ID, which inherits the animal's full upstream history — farm, health, transport.",
      },
      {
        type: "quote",
        text: "Inspection isn't the end of the record. It's the handoff point where the animal's story becomes the product's story.",
        attribution: "Meat inspector, BeefTrace partner facility",
      },
      {
        type: "highlight",
        text: "A single processing failure, caught early because the record is traceable, is cheaper than a recall discovered after the product has already reached shelves.",
      },
    ],
  },
  {
    slug: "built-for-kenya-designed-for-the-future",
    category: "Sustainability",
    title: "Built for Kenya, Designed for the Future",
    excerpt:
      "BeefTrace wasn't built by studying traceability platforms from elsewhere and translating them. It was built by starting with how livestock actually moves through Kenya.",
    image: "/journey/distribution.jpg",
    imageAlt: "Warehouse worker scanning a packaged, QR-coded shipment",
    author: EDITORIAL,
    date: "2026-05-06",
    readTime: "6 min read",
    journeyStage: "distribution",
    body: [
      {
        type: "paragraph",
        text: "Livestock traceability platforms exist elsewhere in the world, built for supply chains with different infrastructure, different market structures, different constraints. BeefTrace starts from a different question entirely: what does traceability need to look like when it's designed for how animals, records, and trust actually move through Kenya?",
      },
      {
        type: "heading",
        text: "Starting from the market, not the server",
      },
      {
        type: "paragraph",
        text: "That means registration that works over unreliable connectivity, records that a smallholder can create in under two minutes, and a chain of custody that respects how animals actually change hands — through markets, through brokers, through relationships that have worked for generations and don't need to be replaced, just recorded.",
      },
      {
        type: "highlight",
        text: "Every farmer, veterinarian, transporter, processor, retailer, and shopper in this chain is Kenyan. The platform had to be built around that reality, not around a template.",
      },
      {
        type: "paragraph",
        text: "The future we're building toward isn't a copy of someone else's traceability system. It's one shaped by the people actually using it — farm to plate.",
      },
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return [...POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedPost(): BlogPost {
  return POSTS.find((p) => p.featured) ?? POSTS[0];
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const rest = POSTS.filter((p) => p.slug !== post.slug);
  const sameCategory = rest.filter((p) => p.category === post.category);
  const sameStage = rest.filter(
    (p) => p.journeyStage === post.journeyStage && !sameCategory.includes(p)
  );
  const remainder = rest.filter((p) => !sameCategory.includes(p) && !sameStage.includes(p));
  return [...sameCategory, ...sameStage, ...remainder].slice(0, limit);
}

export function getPostsByStage(stage: JourneyStage): BlogPost[] {
  return POSTS.filter((p) => p.journeyStage === stage);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
