// Demo-grade auth matching the old site's admin CMS exactly: a hardcoded
// client-side credential check with no server-side verification. This is
// intentional — the admin CMS is a stub/demo per the old repo's own TODOs,
// not a real access-control system.

const DEMO_EMAIL = "admin@thebuilding.practice";
const DEMO_PASSWORD = "password123";
const AUTH_KEY = "blog-auth";

export function checkCredentials(email: string, password: string) {
  return email === DEMO_EMAIL && password === DEMO_PASSWORD;
}

export function setAuthSession(email: string) {
  localStorage.setItem(AUTH_KEY, JSON.stringify({ email, loggedInAt: new Date().toISOString() }));
}

export function isAuthed() {
  if (typeof window === "undefined") return false;
  return Boolean(localStorage.getItem(AUTH_KEY));
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_KEY);
}
