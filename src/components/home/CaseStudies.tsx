import Link from "next/link";
import { LazyImage } from "@/components/ui/LazyImage";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { getAllProjects } from "@/lib/projects";
import styles from "./CaseStudies.module.css";

const FEATURED_SLUGS = [
  "alegeh-house-24-ilabere-avenue-ikoyi-lagos",
  "intercellular-office-victoria-island-lagos",
  "scarlet-lodge-hotel-victoria-island-lagos",
  "karcher-showroom-victoria-island-lagos",
];

export function CaseStudies() {
  const allProjects = getAllProjects();
  const featuredProjects = FEATURED_SLUGS.map((slug) => allProjects.find((project) => project.slug === slug)).filter(
    (project): project is NonNullable<typeof project> => Boolean(project),
  );

  return (
    <section className={`${styles.section} section--alt`} id="projects">
      <div className="container">
        <SectionHeader
          icon="bx-briefcase-alt-2"
          label="Featured Projects"
          title="Architecture Projects in Nigeria"
          description="A curated selection of residential, commercial, and hospitality projects delivered by our architectural team."
          tags={[
            { href: "/projects", icon: "bx-grid-alt", label: "Browse All Projects", variant: "primary" },
            { href: "/projects", icon: "bx-home", label: "Residential Portfolio" },
            { href: "/projects", icon: "bx-building", label: "Commercial Portfolio" },
            { href: "/contact", icon: "bx-phone-call", label: "Discuss a Similar Project" },
          ]}
        />

        <div className={styles.grid}>
          {featuredProjects.map((project, i) => (
            <article key={`${project.title}-${i}`} className={`${styles.card} reveal`}>
              <LazyImage
                src={project.images.main}
                alt={`${project.title} in ${project.location}`}
                fill
                sizes="(max-width: 1100px) 50vw, 25vw"
              />
              <div className={styles.overlay}>
                <div className={styles.content}>
                  <div className={styles.tags}>
                    {project.features.slice(0, 3).map((tag, j) => (
                      <span key={`${tag}-${j}`} className="tag tag--white tag--sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className={styles.title}>{project.title}</h3>
                  <p className={styles.category}>{project.categoryLabel} • {project.location}</p>
                  <div className={styles.actions}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className={styles.action}
                      aria-label={`View details for ${project.title}`}
                    >
                      <i className="bx bx-link-external" aria-hidden="true" />
                    </Link>
                    <Link href="/projects" className={styles.action} aria-label="View all architecture projects">
                      <i className="bx bx-images" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="section-action reveal">
          <Link href="/projects" className="btn btn--secondary">
            <span>See Our Completed Projects</span>
            <i className="bx bx-right-arrow-alt" aria-hidden="true" />
          </Link>
          <Link href="/contact" className="btn btn--primary" style={{ marginLeft: 12 }}>
            <span>Talk to Our Architects</span>
            <i className="bx bx-message-detail" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
