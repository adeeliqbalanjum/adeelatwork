import type { Metadata } from 'next';
import './globals.css';
import './stats-motion.css';
import './testimonials.css';
import './testimonials-mount.css';
import './build-stack.css';
import './build-stack-fix.css';
import './build-stack-icons.css';
import './build-stack-card-polish.css';
import './build-stack-card-logo-fix.css';
import './home-hero-option-b.css';
import './work-digitalists-images.css';
import './home-digitalists-work.css';
import './scrollbar-fix.css';
import './home-stat-cards-option-a.css';
import './portfolio-performance.css';
import './site-consistency-fixes.css';
import './portfolio-upgrades.css';
import './redesign.css';
import './brand-unify.css';
import { ButtonFillController } from './components/ButtonFillController';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { HomeBuildStackMount } from './components/HomeBuildStackMount';
import { HomeDigitalistsWorkMount } from './components/HomeDigitalistsWorkMount';
import { HomeHeroOptionBMount } from './components/HomeHeroOptionBMount';
import { HomeTestimonialsMount } from './components/HomeTestimonialsMount';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { SeoJsonLd } from './components/SeoJsonLd';

export const metadata: Metadata = {
  metadataBase: new URL('https://adeeliqbalanjum.github.io/adeelatwork'),
  title: 'Muhammad Adeel Iqbal — WordPress Developer & WooCommerce Specialist',
  description: 'I build editable WordPress, Elementor Pro and WooCommerce websites with custom functionality, performance optimization, QA, and maintenance for clients in UAE, UK, USA and Pakistan.',
  keywords: ['WordPress Developer', 'Elementor Pro Developer', 'WooCommerce Developer', 'Custom WordPress Plugin', 'Website Speed Optimization', 'Figma to WordPress'],
  openGraph: {
    title: 'Muhammad Adeel Iqbal — WordPress Developer',
    description: 'WordPress, Elementor Pro, WooCommerce, custom features, performance optimization and maintenance.',
    type: 'website',
    url: 'https://adeeliqbalanjum.github.io/adeelatwork',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Adeel Iqbal — WordPress Developer',
    description: 'Editable, fast, client-ready WordPress websites and WooCommerce builds.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <SeoJsonLd />
        <ButtonFillController />
        <ScrollProgressBar type='bar' color='#070707' strokeSize={2} showPercentage={false} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <HomeHeroOptionBMount />
        <HomeBuildStackMount />
        <HomeDigitalistsWorkMount />
        <HomeTestimonialsMount />
      </body>
    </html>
  );
}
