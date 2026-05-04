import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import type { ReactNode } from "react";

import BackgroundCanvas from "@/components/background/BackgroundCanvas";
import { AppShell } from "@/components/shared/AppShell";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iamgideon.vercel.app";
const siteName = "Ogwang Gift Gideon";
const siteDescription =
  "Portfolio website for Ogwang Gift Gideon, a Uganda-based full-stack developer and product builder.";
const ogImagePath = "/images/og-image.jpg";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Full-Stack Developer & Product Builder`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: `${siteName} | Full-Stack Developer & Product Builder`,
    description: siteDescription,
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        alt: "Ogwang Gift Gideon portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Full-Stack Developer & Product Builder`,
    description: siteDescription,
    images: [ogImagePath],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(!sessionStorage.getItem('gideon:preloaderSeen')){document.documentElement.setAttribute('data-loading','');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <BackgroundCanvas />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
