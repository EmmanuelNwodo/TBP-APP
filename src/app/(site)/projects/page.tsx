import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { getAllProjects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/seo";
import styles from "./page.module.css";

const TITLE = "Architecture Projects Nigeria | Lagos Architects Portfolio ARCON | TBP";
const DESCRIPTION =
  "ARCON registered architects Nigeria portfolio - Lagos architecture projects, Abuja building design, Port Harcourt residential commercial developments. 320+ projects completed.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/projects") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: absoluteUrl("/projects") },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main>
      <PageHero
        reveal={false}
        badgeIcon="bx-buildings"
        badgeLabel="Our Portfolio"
        title={
          <>
            Discover Our <span>Building Icons</span>
          </>
        }
        description="Architectural excellence and innovation showcased through our revised company profile portfolio, including residential, commercial, hospitality and institutional work across Nigeria."
        tags={[
          { href: "/services", icon: "bx-building-house", label: "Services", variant: "primary" },
          { href: "/about", icon: "bx-info-circle", label: "About" },
          { href: "/team", icon: "bx-group", label: "Team" },
          { href: "/services#residential", icon: "bx-home", label: "Residential" },
          { href: "/services#commercial", icon: "bx-building", label: "Commercial" },
          { href: "/services#hospitality", icon: "bx-hotel", label: "Hospitality" },
          { href: "/services#interior", icon: "bx-palette", label: "Interior" },
          { href: "/services#landscape", icon: "bx-tree", label: "Landscape" },
          { href: "/services#urban", icon: "bx-city", label: "Urban" },
          { href: "/services#green", icon: "bx-leaf", label: "Green" },
          { href: "/services#renovation", icon: "bx-refresh", label: "Renovation" },
          { href: "/contact", icon: "bx-envelope", label: "Contact" },
          { href: "/reviews", icon: "bx-star", label: "Reviews" },
          { href: "/blog", icon: "bx-book", label: "Blog" },
          { href: "/careers", icon: "bx-briefcase", label: "Careers" },
        ]}
      />

      <section className={styles.section}>
        <div className="container">
          <ProjectsGrid projects={projects} />
        </div>
      </section>
    </main>
  );
}
