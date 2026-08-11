"use client";

import { useState } from "react";
import styles from "./ClientsPartnersTabs.module.css";

const CLIENTS = [
  { name: "Riggs Ventures West Africa", featured: true },
  { name: "The German Technology Ltd" },
  { name: "New Comex Nigeria Ltd" },
  { name: "Regent Construction Ltd" },
  { name: "First Synergy Homes Ltd" },
  { name: "Scarlet Lodge Ltd" },
  { name: "Unified Payments Services Ltd", featured: true },
  { name: "Augustine Alegeh (SAN)" },
  { name: "Nigerian Bar Association", featured: true },
  { name: "TLS Contact Centre" },
  { name: "Glitters Boutique" },
  { name: "Q.F.A Nigeria Ltd (Krispy Kreme)", featured: true },
  { name: "Telile Investment Ltd" },
  { name: "Federal University of Petroleum Resources", featured: true },
  { name: "Nigerian Stored Products Research Institute" },
  { name: "Aruba Development Ltd" },
  { name: "Promasidor Nigeria Ltd", featured: true },
  { name: "Lagos State Development & Property Corporation" },
];

const PARTNERS = [
  { name: "FEZ Integrated Services Ltd", featured: true },
  { name: "Builders Craft Ltd" },
  { name: "EA and Associates Ltd" },
  { name: "Sub-Stratum Design Concepts" },
  { name: "Pathway Engineering" },
  { name: "KF & Associates" },
  { name: "Engineering Partnership Ltd", featured: true },
  { name: "Phoz Nigeria Ltd" },
  { name: "Firstlakeside Technologies Ltd" },
  { name: "Standard Consultancy Services" },
  { name: "Projects + Potentials", featured: true },
  { name: "Runall Integrated Services" },
];

export function ClientsPartnersTabs() {
  const [tab, setTab] = useState<"clients" | "partners">("clients");
  const items = tab === "clients" ? CLIENTS : PARTNERS;

  return (
    <>
      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${tab === "clients" ? styles.active : ""}`}
          onClick={() => setTab("clients")}
        >
          <i className="bx bx-user" aria-hidden="true" />
          Our Clients
        </button>
        <button
          type="button"
          className={`${styles.tab} ${tab === "partners" ? styles.active : ""}`}
          onClick={() => setTab("partners")}
        >
          <i className="bx bx-handshake" aria-hidden="true" />
          Our Partners
        </button>
      </div>

      <div className={styles.grid}>
        {items.map((item, i) => (
          <div key={`${item.name}-${i}`} className={`${styles.card} ${item.featured ? styles.featured : ""}`}>
            <h5>{item.name}</h5>
          </div>
        ))}
      </div>
    </>
  );
}
