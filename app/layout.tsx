import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Adeel Iqbal — Live WordPress Capability Showroom",
  description: "A live WordPress capability showroom by Muhammad Adeel Iqbal — Elementor, WooCommerce, custom plugins, booking systems, translation, speed optimization, and responsive WordPress builds.",
  openGraph: {
    title: "Muhammad Adeel Iqbal — Live WordPress Capability Showroom",
    description: "Not just a portfolio — a working demo of WordPress, Elementor, WooCommerce, and custom plugin capabilities.",
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
