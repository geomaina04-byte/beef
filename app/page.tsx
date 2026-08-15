import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import PlatformPreview from "@/components/PlatformPreview";
import VideoStorySection from "@/components/VideoStorySection";
import Journey from "@/components/Journey";
import Stats from "@/components/Stats";
import FieldGallery from "@/components/FieldGallery";
import PosterShowcase from "@/components/PosterShowcase";
import Testimonials from "@/components/Testimonials";
import Security from "@/components/Security";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <TrustedBy />
      <Problem />
      <Solution />
      <HowItWorks />
      <Features />
      <PlatformPreview />
      <VideoStorySection />
      <Journey />
      <Stats />
      <FieldGallery />
      <PosterShowcase />
      <Testimonials />
      <Security />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
