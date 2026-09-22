/**
 * WhatsApp contact configuration.
 *
 * Kept separate from the component so the number, the message and the encoded
 * URL have exactly one definition that both the UI and the tests read.
 */

/** Verified business number, digits only, as wa.me requires (no spaces, no +). */
export const WHATSAPP_NUMBER = "2349049721840";

/** Prefilled message the visitor sends. */
export const WHATSAPP_PREFILLED_MESSAGE =
  "Hello The Building Practice, I would like to discuss an architectural project.";

/**
 * The destination. The message is encoded with `encodeURIComponent` rather
 * than hand-escaped, so punctuation and spaces can never produce a malformed
 * query string.
 */
export const WHATSAPP_CHAT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_PREFILLED_MESSAGE,
)}`;

/** Short visual label; the accessible name below contains this text. */
export const WHATSAPP_VISIBLE_LABEL = "Chat with us";

/**
 * Accessible name. It deliberately begins with the visible label so the
 * control satisfies WCAG 2.5.3 (Label in Name) while still naming the channel
 * and the business.
 */
export const WHATSAPP_ACCESSIBLE_NAME = "Chat with us on WhatsApp – The Building Practice";
