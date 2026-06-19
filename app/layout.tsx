import type { Metadata } from 'next';
import './globals.css';
import './stats-motion.css';
import './testimonials.css';
import './testimonials-mount.css';
import './process-options.css';
import './home-process-orbit.css';
import './home-process-tweaks.css';
import './build-stack.css';
import './scrollbar-fix.css';
import { ButtonFillController } from './components/ButtonFillController';
import { HomeBuildStackMount } from './components/HomeBuildStackMount';
import { HomeProcessOrbitMount } from './components/HomeProcessOrbitMount';
import { HomeTestimonialsMount } from './components/HomeTestimonialsMount';
import { ScrollProgressBar } from './components/ScrollProgressBar';

export const metadata: Metadata = {
  title: 'Muhammad Adeel Iqbal — WordPress Developer & WooCommerce Specialist',
  description: 'I build and redesign WordPress & WooCommerce websites for businesses in the UAE, UK, and USA. 3+ years, 50+ projects, Elementor Pro, custom plugins.',
  openGraph: {
    title: 'Muhammad Adeel Iqbal — WordPress Developer',
    description: 'Building fast, high-impact WordPress & WooCommerce websites for international clients.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <ButtonFillController />
        <ScrollProgressBar type='bar' color='#070707' strokeSize={2} showPercentage={false} />
        <ScrollProgressBar position='bottom-right' color='#070707' strokeSize={3} showPercentage />
        {children}
        <HomeBuildStackMount />
        <HomeProcessOrbitMount />
        <HomeTestimonialsMount />
      </body>
    </html>
  );
}
