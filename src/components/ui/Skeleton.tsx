import styles from "./Skeleton.module.css";

export function Skeleton() {
  return <span className={styles.skeleton} aria-hidden="true" />;
}
