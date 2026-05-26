import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { ContractProvider } from "@/components/contract/ContractProvider";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { SkipLink } from "@/components/layout/SkipLink";
import { Analytics } from "@/components/analytics/Analytics";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} · ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  manifest: "/manifest.webmanifest",
  applicationName: siteConfig.name,
  formatDetection: { telephone: false },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf9f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1219" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-cream-50 text-ink-900">
        <SkipLink />
        <ContractProvider>{children}</ContractProvider>
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
