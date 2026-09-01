import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollRevealObserver } from "@/components/layout/ScrollRevealObserver";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { ThemeToggle } from "@/components/layout/ThemeToggle";



export const metadata: Metadata = { verification: { google: "Nb-4F556z8SRISsGSqEJIXJvOtpMxCVfFhdf-oX1FpM", }, };


export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SplashScreen />
      <Header />
      {children}
      <Footer />
      <ThemeToggle />
      <ScrollRevealObserver />
    </>
  );
}
