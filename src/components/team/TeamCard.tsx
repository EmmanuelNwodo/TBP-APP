import Link from "next/link";
import { LazyImage } from "@/components/ui/LazyImage";
import type { TeamMember } from "@/types/team";
import styles from "./TeamCard.module.css";

const BADGES: Record<number, { text: string; icon: string } | undefined> = {
  1: { text: "Principal", icon: "bx-crown" },
  2: { text: "Partner", icon: "bx-star" },
  3: { text: "Senior", icon: "bx-badge-check" },
};

function roleIcon(designation: string) {
  const d = designation.toLowerCase();
  if (d.includes("architect")) return "bx-building-house";
  if (d.includes("engineer")) return "bx-hard-hat";
  if (d.includes("manager")) return "bx-briefcase-alt-2";
  if (d.includes("partner")) return "bx-crown";
  if (d.includes("associate")) return "bx-user-check";
  if (d.includes("officer")) return "bx-user";
  if (d.includes("coordinator")) return "bx-network-chart";
  if (d.includes("consultant")) return "bx-conversation";
  if (d.includes("director")) return "bx-palette";
  if (d.includes("surveyor")) return "bx-ruler";
  if (d.includes("assistant")) return "bx-support";
  return "bx-user-circle";
}

export function TeamCard({ member, hierarchy }: { member: TeamMember; hierarchy: number }) {
  const badge = BADGES[hierarchy];
  const highlightClass = hierarchy === 1 ? styles.principal : hierarchy === 2 ? styles.partner : hierarchy === 3 ? styles.senior : "";

  return (
    <Link href={`/team/${member.id}`} className={`${styles.card} ${highlightClass}`}>
      <div className={styles.imageWrapper}>
        {member.photo ? (
          <LazyImage src={member.photo} alt={member.name} fill sizes="(max-width: 640px) 50vw, 176px" />
        ) : (
          <div className={styles.imageFallback}>{member.initials}</div>
        )}
        <div className={styles.roleIcon}>
          <i className={`bx ${roleIcon(member.title)}`} aria-hidden="true" />
        </div>
        {badge && (
          <div className={styles.badge}>
            <i className={`bx ${badge.icon}`} aria-hidden="true" />
            <span>{badge.text}</span>
          </div>
        )}
      </div>
      <div className={styles.body}>
        <div>
          <h3 className={styles.name}>{member.name}</h3>
          <p className={styles.role}>{member.title}</p>
        </div>
        <span className={styles.btn}>
          <span>View Profile</span>
          <i className="bx bx-right-arrow-alt" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
