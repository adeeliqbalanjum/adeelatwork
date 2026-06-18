import type { Metadata } from "next";
import "./globals.css";
import "./portfolio-v4-hero.css";

export const metadata: Metadata = {
  title: "Muhammad Adeel Iqbal — WordPress Developer",
  description: "Portfolio homepage for a WordPress, Elementor, WooCommerce and performance-focused developer.",
  openGraph: {
    title: "Muhammad Adeel Iqbal — WordPress Developer",
    description: "Building fast, high-impact WordPress and WooCommerce websites for business clients.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
