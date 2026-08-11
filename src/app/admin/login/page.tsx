"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { checkCredentials, setAuthSession } from "@/lib/admin-auth";
import styles from "./page.module.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    if (checkCredentials(email, password)) {
      setAuthSession(email);
      router.push("/admin/blog");
    } else {
      setError("Invalid email or password. Try admin@thebuilding.practice / password123");
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <i className="bx bx-buildings" aria-hidden="true" />
          <span>The Building Practice</span>
        </div>
        <h1>Blog Admin</h1>
        <p className={styles.subtitle}>Sign in to manage articles.</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.group}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="admin@thebuilding.practice" required />
          </div>
          <div className={styles.group}>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" required />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className="btn btn--primary btn--full">
            Sign In
          </button>
        </form>

        <p className={styles.hint}>Demo credentials: admin@thebuilding.practice / password123</p>
      </div>
    </div>
  );
}
