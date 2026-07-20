import type { Metadata } from 'next';
import { Tangerine, EB_Garamond, Amiri } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

// Self-hosted at build time (served from our own domain, auto-preloaded).
// No runtime dependency on Google's servers.
const tangerine = Tangerine({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-tangerine',
});

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-eb-garamond',
});

const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-amiri',
});

export const metadata: Metadata = {
  title: 'Mohamed AlSaba & Gelan Badr — Wedding 2026',
  description: 'We invite you to join us in celebrating our wedding. September 30, 2026 · Heliopolis, Cairo.',
  keywords: ['wedding', 'Mohamed AlSaba', 'Gelan Badr', 'Cairo', 'Heliopolis', '2026'],
  openGraph: {
    title: 'Mohamed AlSaba & Gelan Badr — Wedding 2026',
    description: 'Join us in celebrating our wedding. September 30, 2026.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${tangerine.variable} ${ebGaramond.variable} ${amiri.variable}`}
    >
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
