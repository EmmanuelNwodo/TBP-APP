"use client";

import { useState, type FormEvent } from "react";
import styles from "./ContactForm.module.css";

const SUBJECTS = [
  { value: "", label: "Select a topic" },
  { value: "general", label: "General Inquiry" },
  { value: "project", label: "New Project" },
  { value: "consultation", label: "Consultation Request" },
  { value: "partnership", label: "Partnership Opportunity" },
  { value: "careers", label: "Careers" },
  { value: "other", label: "Other" },
];

type Status = "idle" | "submitting" | "sent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    // Matches the old site: client-side validation only, no backend endpoint.
    window.setTimeout(() => setStatus("sent"), 900);
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Send us a Message</h2>
        <p className={styles.subtitle}>Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="firstName">
              First Name *
            </label>
            <input id="firstName" name="firstName" className={styles.input} placeholder="John" required />
          </div>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="lastName">
              Last Name *
            </label>
            <input id="lastName" name="lastName" className={styles.input} placeholder="Doe" required />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="email">
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={styles.input}
              placeholder="john@example.com"
              required
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="phone">
              Phone Number
            </label>
            <input id="phone" name="phone" type="tel" className={styles.input} placeholder="+234 800 000 0000" />
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="subject">
            Subject *
          </label>
          <select id="subject" name="subject" className={styles.select} required defaultValue="">
            {SUBJECTS.map((subject) => (
              <option key={subject.value} value={subject.value}>
                {subject.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="message">
            Your Message *
          </label>
          <textarea
            id="message"
            name="message"
            className={styles.textarea}
            placeholder="Tell us about your project or inquiry..."
            required
          />
        </div>

        <button type="submit" className={styles.submit} disabled={status !== "idle"}>
          <span>{status === "sent" ? "Message Sent" : status === "submitting" ? "Sending..." : "Send Message"}</span>
          <i className={`bx ${status === "sent" ? "bx-check" : "bx-send"}`} aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
