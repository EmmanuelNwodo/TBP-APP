import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { getAllProjects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/seo";
import styles from "./page.module.css";

const TITLE = "Architecture Projects Nigeria | Lagos Architects Portfolio ARCON";
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
      <section className={styles.section}>
        <ProjectsGrid projects={projects} variant="portfolio" />
      </section>
    </main>
  );
}
