"use client";

import { useState, type FormEvent } from "react";
import styles from "./CareersApplyForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";

export function CareersApplyForm({ role, onClose }: { role: string; onClose: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/careers/apply", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Submission failed");

      setStatus("success");
      setMessage("Application received — we'll be in touch soon.");
      form.reset();
    } catch {
      // Graceful degradation, matching the old site: keep a local backup and
      // hand off to a mailto link rather than losing the application.
      try {
        const backup = {
          role,
          fullName: formData.get("fullName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          linkedin: formData.get("linkedin"),
          portfolio: formData.get("portfolio"),
          coverLetter: formData.get("coverLetter"),
          savedAt: new Date().toISOString(),
        };
        window.localStorage.setItem("tbpCareerApplicationBackup", JSON.stringify(backup));
      } catch {
        // localStorage unavailable — nothing more we can do client-side.
      }

      const subject = encodeURIComponent(`Application: ${role}`);
      const body = encodeURIComponent(
        `Name: ${formData.get("fullName")}\nEmail: ${formData.get("email")}\nPhone: ${formData.get("phone")}\nPortfolio: ${formData.get("portfolio")}\n\nPlease attach your resume to this email.`
      );
      setStatus("error");
      setMessage(
        "We couldn't submit automatically. Your details were saved locally — please email us directly to complete your application."
      );
      window.setTimeout(() => {
        window.location.href = `mailto:info@buildingpractice.biz?subject=${subject}&body=${body}`;
      }, 1200);
    }
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{role}</h3>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
            <i className="bx bx-x" aria-hidden="true" />
          </button>
        </div>
        <p className={styles.note}>
          Share your details, portfolio and CV. If the careers API is online, your application will be saved
          automatically; otherwise we will prepare a direct email submission for you.
        </p>

        <form onSubmit={handleSubmit}>
          <input type="hidden" name="role" value={role} />

          <div className={styles.row}>
            <div className={styles.group}>
              <label>Full Name *</label>
              <input type="text" name="fullName" required />
            </div>
            <div className={styles.group}>
              <label>Email *</label>
              <input type="email" name="email" required />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.group}>
              <label>Phone *</label>
              <input type="tel" name="phone" required />
            </div>
            <div className={styles.group}>
              <label>LinkedIn Profile</label>
              <input type="url" name="linkedin" placeholder="https://linkedin.com/in/..." />
            </div>
          </div>

          <div className={styles.group}>
            <label>Portfolio Link *</label>
            <input type="url" name="portfolio" placeholder="https://behance.net/..." required />
            <span className={styles.hint}>Portfolio, website, Behance, Google Drive, or LinkedIn project link.</span>
          </div>

          <div className={styles.group}>
            <label>Resume/CV *</label>
            <input type="file" name="resume" accept=".pdf,.doc,.docx" required />
            <span className={styles.hint}>Accepted formats: PDF, DOC, DOCX. Maximum 10MB.</span>
          </div>

          <div className={styles.group}>
            <label>Cover Letter</label>
            <textarea name="coverLetter" rows={4} placeholder="Tell us why you'd be a great fit..." />
          </div>

          <button type="submit" className="btn btn--primary btn--full" disabled={status === "submitting"}>
            {status === "submitting" ? "Submitting..." : "Submit Application"}
          </button>

          {message && (
            <p className={`${styles.status} ${status === "error" ? styles.statusError : styles.statusSuccess}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
