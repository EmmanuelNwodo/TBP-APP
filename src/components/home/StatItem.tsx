"use client";

import { useCountUp } from "@/hooks/useCountUp";
import styles from "./Stats.module.css";

type StatItemProps = {
  icon: string;
  target: number;
  label: string;
};

export function StatItem({ icon, target, label }: StatItemProps) {
  const { ref, value } = useCountUp(target);

  return (
    <div className={`${styles.item} reveal`} ref={ref}>
      <div className={styles.itemIcon}>
        <i className={`bx ${icon}`} aria-hidden="true" />
      </div>
      <div className={styles.itemNumber}>{value}</div>
      <div className={styles.itemLabel}>{label}</div>
    </div>
  );
}
