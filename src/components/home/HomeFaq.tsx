import Link from "next/link";
import styles from "./HomeFaq.module.css";

const FAQS = [
  {
    question: "What services does your architectural firm provide?",
    answer:
      "We provide architectural design, residential and commercial architecture, interior architecture, planning support, and project delivery coordination.",
  },
  {
    question: "Do you provide architectural design services in Lagos and across Nigeria?",
    answer:
      "Yes. Our studio is based in Lagos and we work on projects in different parts of Nigeria based on project requirements.",
  },
  {
    question: "Do you handle both residential and commercial projects?",
    answer:
      "Yes. Our portfolio includes homes, workplaces, hospitality, and institutional projects.",
  },
  {
    question: "How can I start a project with The Building Practice?",
    answer:
      "Share your project goals through our contact page and the team will guide you through the next steps, scope definition, and consultation.",
  },
];

export function HomeFaq() {
  return (
    <section className={`${styles.section} section--alt`} id="faq">
      <div className="container">
        <header className={styles.header}>
          <span className="section-label">
            <i className="bx bx-help-circle" aria-hidden="true" />
            Frequently Asked Questions
          </span>
          <h2 className={styles.title}>Questions About Our Architectural Services in Nigeria</h2>
          <p className={styles.description}>
            Clear answers to common questions from clients planning residential, commercial, and institutional projects.
          </p>
        </header>

        <div className={styles.list}>
          {FAQS.map((item, index) => (
            <details key={`${item.question}-${index}`} className={styles.item}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>

        <div className={styles.actions}>
          <Link href="/services" className="btn btn--secondary btn--sm">
            Explore Architectural Services
          </Link>
          <Link href="/contact" className="btn btn--primary btn--sm">
            Request a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
