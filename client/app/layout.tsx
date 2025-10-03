import "./globals.css";
import { DataCacheProvider } from "@/contexts/DataCacheContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // ensures text shows immediately
});

export const metadata: Metadata = {
  title: "AtlazOne",
  description: "AtlazOne - Empowering Innovation, One Step at a Time",
  icons: {
    icon: [
      {
        url: "/ATLAZONE.ico",
        type: "image/x-icon",
      },
    ],
    apple: [
      {
        url: "/ATLAZONE.ico",
        type: "image/x-icon",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <Analytics />
      <body className={`${inter.className} overflow-x-hidden`}>
        <DataCacheProvider>{children}</DataCacheProvider>
      </body>
    </html>
  );
}
