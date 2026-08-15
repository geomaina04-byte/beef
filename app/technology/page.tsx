import type { Metadata } from "next";
import Nav from "@/components/Nav";
import TechHero from "@/components/technology/TechHero";
import ArchitectureDiagram from "@/components/technology/ArchitectureDiagram";
import TechPillars from "@/components/technology/TechPillars";
import LedgerTicker from "@/components/technology/LedgerTicker";
import ComplianceStrip from "@/components/technology/ComplianceStrip";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Technology — BeefTrace",
  description:
    "The architecture behind BeefTrace: offline-first field capture, blockchain-anchored verification, GPS movement tracking, and AI analytics — built for national-scale livestock traceability.",
};

export default function TechnologyPage() {
  return (
    <main className="relative">
      <Nav />
      <TechHero />
      <ArchitectureDiagram />
      <TechPillars />
      <LedgerTicker />
      <ComplianceStrip />
      <FinalCTA />
      <Footer />
    </main>
  );
}
