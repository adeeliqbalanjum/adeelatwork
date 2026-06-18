import type { Metadata } from "next";
import "./globals.css";
import "./stats-motion.css";
import { ButtonFillController } from "./components/ButtonFillController";

export const metadata: Metadata = {
  title: "Muhammad Adeel Iqbal — WordPress Developer & WooCommerce Specialist",
  description: "I build and redesign WordPress & WooCommerce websites for businesses in the UAE, UK, and USA. 3+ years, 50+ projects, Elementor Pro, custom plugins.",
  openGraph: {
    title: "Muhammad Adeel Iqbal — WordPress Developer",
    description: "Building fast, high-impact WordPress & WooCommerce websites for international clients.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ButtonFillController />
        {children}
      </body>
    </html>
  );
}
