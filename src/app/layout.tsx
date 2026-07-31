import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import { site } from "@/content/site";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
});

const description =
  "Senior BI & Data Engineer with 7+ years building modern data platforms — Microsoft Fabric architecture, Azure data ecosystem, and AI-augmented delivery.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description,
  keywords: [
    "Microsoft Fabric",
    "Business Intelligence",
    "Data Engineer",
    "Power BI",
    "Databricks",
    "dbt",
    "Azure",
    "PySpark",
    "Vitor Martinho",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#06070a",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description,
  url: site.url,
  email: `mailto:${site.email}`,
  telephone: site.phone,
  sameAs: [site.linkedin, site.github],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Goiânia",
    addressCountry: "BR",
  },
  knowsLanguage: ["English", "Portuguese", "Spanish"],
  knowsAbout: [
    "Microsoft Fabric",
    "Azure Data Platform",
    "Business Intelligence",
    "Data Engineering",
    "Power BI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}>
      <body className="antialiased">
        <MotionProvider>{children}</MotionProvider>
        <div className="grain" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
