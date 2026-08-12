import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@id": `${SITE_URL}/#organization`,
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "The Building Practice Ltd",
  url: SITE_URL,
  telephone: "+2349049721840",
  email: "info@thebuildingpractice.com",
  logo: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  description: "Professional architectural design, construction management, and urban development services in Nigeria.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot 6, Remi Olowude Street",
    addressLocality: "Lekki Phase 1",
    addressRegion: "Lagos",
    postalCode: "100231",
    addressCountry: "NG",
  },
  geo: { "@type": "GeoCoordinates", latitude: "6.4541", longitude: "3.4747" },
  areaServed: [
    { "@type": "City", name: "Lagos" },
    { "@type": "City", name: "Abuja" },
    { "@type": "City", name: "Port Harcourt" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  priceRange: "$$",
  sameAs: [
    "https://www.facebook.com/thebuildingpractice",
    "https://www.instagram.com/thebuildingpractice",
    "https://www.linkedin.com/company/the-building-practice-ltd/",
    "https://twitter.com/thebplimited",
  ],
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en-NG",
};

const DEFAULT_TITLE = "The Building Practice | Architects in Lagos, Nigeria";
const DEFAULT_DESCRIPTION =
  "The Building Practice is a Lagos-based architectural firm delivering residential, commercial, and institutional design services across Nigeria.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  authors: [{ name: SITE_NAME }],
  robots: { index: true, follow: true },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    images: [{ url: DEFAULT_OG_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Vendored icon font served from /public — not a bundler-processed
            stylesheet, so it's linked directly rather than imported. */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/fonts/boxicons.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
      </head>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
