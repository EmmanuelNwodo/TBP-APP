import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { FeaturedShowcase } from "@/components/home/FeaturedShowcase";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { Studio } from "@/components/home/Studio";
import { Values } from "@/components/home/Values";
import { WhyUs } from "@/components/home/WhyUs";
import { Certifications } from "@/components/home/Certifications";
import { Services } from "@/components/home/Services";
import { CaseStudies } from "@/components/home/CaseStudies";
import { Stats } from "@/components/home/Stats";
import { TeamPreview } from "@/components/home/TeamPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { BlogPreview } from "@/components/home/BlogPreview";

const TITLE = "Architectural Design Services Nigeria | ARCON Architects TBP";
const DESCRIPTION =
  "ARCON registered architects Nigeria offering architectural design services Nigeria, 3D building design Lagos, modern residential architecture Port Harcourt, sustainable building consultant Nigeria. Lagos Abuja PH.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: absoluteUrl("/") },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedShowcase />
      <FeaturedGrid />
      <Studio />
      <Values />
      <WhyUs />
      <Certifications />
      <Services />
      <CaseStudies />
      <Stats />
      <TeamPreview />
      <Testimonials />
      <BlogPreview />
    </>
  );
}
