import {
  WHATSAPP_ACCESSIBLE_NAME,
  WHATSAPP_CHAT_URL,
  WHATSAPP_VISIBLE_LABEL,
} from "@/lib/whatsapp";
import styles from "./WhatsAppChatButton.module.css";

/**
 * Floating WhatsApp chat link.
 *
 * A plain server-rendered anchor: no client component, no hydration, no
 * third-party widget, no cookies and no tracking. It is rendered once from the
 * shared public site layout, so it appears on every normal public page and on
 * none of the XML, XSL, robots, API or admin routes, which never mount that
 * layout.
 *
 * The number, message and encoded URL live in `@/lib/whatsapp`.
 */
export function WhatsAppChatButton() {
  return (
    <a
      href={WHATSAPP_CHAT_URL}
      className={styles.button}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={WHATSAPP_ACCESSIBLE_NAME}
    >
      {/* Boxicons is already loaded site-wide, so this costs no extra bytes. */}
      <i className={`bx bxl-whatsapp ${styles.icon}`} aria-hidden="true" />
      <span className={styles.label} aria-hidden="true">
        {WHATSAPP_VISIBLE_LABEL}
      </span>
    </a>
  );
}
