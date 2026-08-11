export const SITE_URL = "https://thebuildingpractice.com";
export const SITE_NAME = "The Building Practice Ltd.";
export const DEFAULT_OG_IMAGE = "/images/bp.png";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
