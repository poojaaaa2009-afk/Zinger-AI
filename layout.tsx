import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zinger AI — Outsmart the Noise",
  description: "Instant replies. Zero effort. Your AI-powered smart reply generator.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Zinger AI" }
};
export const viewport: Viewport = { themeColor: "#0B0B0E", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}