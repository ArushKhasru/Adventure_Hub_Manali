import type { Metadata, Viewport } from "next";
import {
  Atkinson_Hyperlegible_Next,
  Bricolage_Grotesque,
} from "next/font/google";
import Footer from "@/components/Footer";
import RouteSplash from "@/components/RouteSplash";
import SiteHeader from "@/components/SiteHeader";
import WelcomeSplash from "@/components/WelcomeSplash";
import "./globals.css";

const displayFont = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const bodyFont = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adventure-hub-manali.vercel.app"),
  title: {
    default: "Adventure Hub Manali",
    template: "%s | Adventure Hub Manali",
  },
  description:
    "Plan stays, travel, tours, and outdoor activities across Manali in one place for families and adventure travelers.",
  applicationName: "Adventure Hub Manali",
  keywords: [
    "Manali travel guide",
    "Manali adventure activities",
    "Manali stays",
    "Manali trip planning",
    "Solang Valley activities",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Adventure Hub Manali",
    title: "Adventure Hub Manali",
    description:
      "Plan stays, travel, tours, and outdoor activities across Manali in one place.",
  },
  twitter: {
    card: "summary",
    title: "Adventure Hub Manali",
    description:
      "Plan stays, travel, tours, and outdoor activities across Manali in one place.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#2D6A4F",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-[var(--color-soft-white)] text-[var(--color-ink)]">
        {/* Runs before paint — hides splash if already shown in this session to prevent flash on reload */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("ahm-splash-shown"))document.documentElement.dataset.skipSplash="1"}catch(e){}`,
          }}
        />
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        <main
          id="main-content"
          className="site-main flex min-h-[calc(100vh-var(--header-height))] flex-1 flex-col pt-[var(--header-height)]"
          tabIndex={-1}
        >
          {children}
        </main>
        <Footer />
        <RouteSplash />
        <WelcomeSplash />
      </body>
    </html>
  );
}
