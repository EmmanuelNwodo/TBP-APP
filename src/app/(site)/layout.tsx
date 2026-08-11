import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollRevealObserver } from "@/components/layout/ScrollRevealObserver";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

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
