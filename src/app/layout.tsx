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
  "@type": ["LocalBusiness", "ArchitecturalService"],
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Architectural Design Services Nigeria | ARCON Architects TBP",
  description:
    "ARCON registered architects Nigeria offering architectural design services Nigeria, 3D building design Lagos, modern residential architecture Port Harcourt, sustainable building consultant Nigeria. Lagos Abuja PH.",
  authors: [{ name: SITE_NAME }],
  robots: { index: true, follow: true },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    images: [{ url: DEFAULT_OG_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
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
      </head>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
