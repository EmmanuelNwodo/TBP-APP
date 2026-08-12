import type { Metadata } from "next";
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";
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
import { HomeFaq } from "../../components/home/HomeFaq";

const TITLE = "Leading Architectural Firm in Nigeria";
const DESCRIPTION =
  "Lagos-based architectural firm in Nigeria delivering residential, commercial, and civic architecture, interior architecture, and project delivery support.";

const HOME_PAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": absoluteUrl("/#webpage"),
      url: absoluteUrl("/"),
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      primaryImageOfPage: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
      inLanguage: "en-NG",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#professional-service`,
      name: "The Building Practice Ltd",
      url: SITE_URL,
      image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
      areaServed: ["Nigeria", "Lagos"],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Plot 6, Remi Olowude Street",
        addressLocality: "Lekki Phase 1",
        addressRegion: "Lagos",
        addressCountry: "NG",
      },
      serviceType: [
        "Architectural Design",
        "Residential Architecture",
        "Commercial Architecture",
        "Interior Architecture",
        "Urban Planning and Master Planning",
        "Project and Construction Support",
      ],
      telephone: "+2349049721840",
      email: "info@thebuildingpractice.com",
    },
  ],
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "architectural firms in Nigeria",
    "architecture firms in Nigeria",
    "architects in Nigeria",
    "architecture firms in Lagos",
    "architectural services in Nigeria",
  ],
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    locale: "en_NG",
    images: [{ url: DEFAULT_OG_IMAGE }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_PAGE_JSON_LD) }}
      />
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
      <HomeFaq />
      <BlogPreview />
    </>
  );
}
