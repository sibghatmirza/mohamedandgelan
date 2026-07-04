import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'Mohamed & Gelan — Wedding 2026',
  description: 'We invite you to join us in celebrating our wedding. September 30, 2026 · Heliopolis, Cairo.',
  keywords: ['wedding', 'Mohamed', 'Gelan', 'Cairo', 'Heliopolis', '2026'],
  openGraph: {
    title: 'Mohamed & Gelan — Wedding 2026',
    description: 'Join us in celebrating our wedding. September 30, 2026.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
