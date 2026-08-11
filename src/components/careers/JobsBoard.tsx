"use client";

import { useMemo, useState } from "react";
import { CareersApplyForm } from "./CareersApplyForm";
import styles from "./JobsBoard.module.css";

type Job = {
  title: string;
  dept: "architecture" | "design" | "project" | "technical";
  deptLabel: string;
  level: "junior" | "mid" | "senior" | "lead";
  location: "lagos" | "remote";
  locationLabel: string;
};

const JOBS: Job[] = [
  { title: "Senior Architect", dept: "architecture", deptLabel: "Architecture", level: "senior", location: "lagos", locationLabel: "Lagos, Nigeria" },
  { title: "Junior Architect", dept: "architecture", deptLabel: "Architecture", level: "junior", location: "lagos", locationLabel: "Lagos, Nigeria" },
  { title: "BIM Specialist", dept: "technical", deptLabel: "Technical", level: "mid", location: "remote", locationLabel: "Remote / Lagos" },
  { title: "Interior Designer", dept: "design", deptLabel: "Design", level: "mid", location: "lagos", locationLabel: "Lagos, Nigeria" },
  { title: "Project Architect", dept: "project", deptLabel: "Project Management", level: "lead", location: "lagos", locationLabel: "Lagos, Nigeria" },
];

export function JobsBoard() {
  const [dept, setDept] = useState("");
  const [level, setLevel] = useState("");
  const [location, setLocation] = useState("");
  const [activeJob, setActiveJob] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      JOBS.filter(
        (job) => (!dept || job.dept === dept) && (!level || job.level === level) && (!location || job.location === location)
      ),
    [dept, level, location]
  );

  return (
    <>
      <div className={styles.filters}>
        <select className={styles.select} value={dept} onChange={(e) => setDept(e.target.value)}>
          <option value="">All Departments</option>
          <option value="architecture">Architecture</option>
          <option value="design">Design</option>
          <option value="project">Project Management</option>
          <option value="technical">Technical</option>
        </select>
        <select className={styles.select} value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="">All Levels</option>
          <option value="junior">Junior</option>
          <option value="mid">Mid-Level</option>
          <option value="senior">Senior</option>
          <option value="lead">Lead</option>
        </select>
        <select className={styles.select} value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">All Locations</option>
          <option value="lagos">Lagos</option>
          <option value="remote">Remote</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>No open roles match those filters. Try another department, level, or location.</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((job, i) => (
            <div key={`${job.title}-${i}`} className={styles.card}>
              <div>
                <h3 className={styles.title}>{job.title}</h3>
                <div className={styles.meta}>
                  <span>
                    <i className="bx bx-map" aria-hidden="true" /> {job.locationLabel}
                  </span>
                  <span>
                    <i className="bx bx-briefcase" aria-hidden="true" /> {job.deptLabel}
                  </span>
                </div>
                <span className={styles.type}>Full-time</span>
              </div>
              <button type="button" className="btn btn--primary" onClick={() => setActiveJob(job.title)}>
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}

      {activeJob && <CareersApplyForm role={activeJob} onClose={() => setActiveJob(null)} />}
    </>
  );
}
