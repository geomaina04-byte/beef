import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlogHero from "@/components/blog/BlogHero";
import FeaturedStory from "@/components/blog/FeaturedStory";
import StoriesExplorer from "@/components/blog/StoriesExplorer";
import KenyanStorytelling from "@/components/blog/KenyanStorytelling";
import SocialFollow from "@/components/blog/SocialFollow";
import FinalCTA from "@/components/FinalCTA";
import { getAllPosts, getFeaturedPost } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Stories — BeefTrace",
  description:
    "Farmer stories, technology updates, and community impact from Kenya's livestock journey — the people and innovation behind every trace.",
};

export default function BlogIndexPage() {
  const allPosts = getAllPosts();
  const featured = getFeaturedPost();
  const gridPosts = allPosts.filter((p) => p.slug !== featured.slug);

  return (
    <main className="relative">
      <Nav />
      <BlogHero featured={featured} />
      <FeaturedStory post={featured} />
      <StoriesExplorer posts={gridPosts} />
      <KenyanStorytelling />
      <SocialFollow />
      <FinalCTA />
      <Footer />
    </main>
  );
}
