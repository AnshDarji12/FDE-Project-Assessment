import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import FloatingActions from '@/components/floating-actions';
import Reveal from '@/components/reveal';
import Curtain from '@/components/curtain';

const fraunces = localFont({
  src: '../fonts/fraunces-latin-var.woff2',
  variable: '--font-fraunces',
  weight: '100 900',
  display: 'swap',
  preload: true,
});

const figtree = localFont({
  src: '../fonts/figtree-latin-var.woff2',
  variable: '--font-figtree',
  weight: '300 900',
  display: 'swap',
  preload: true,
});

const shantell = localFont({
  src: '../fonts/shantell-latin-var.woff2',
  variable: '--font-shantell',
  weight: '300 800',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://puppy.instabizweb.com'),
  title: {
    default: 'TeddyPups U.A.E. — Premium teacup puppies in Dubai',
    template: '%s | TeddyPups U.A.E.',
  },
  description:
    'Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide. Vet-checked puppies, worldwide delivery.',
  openGraph: {
    type: 'website',
    siteName: 'TeddyPups U.A.E.',
    title: 'TeddyPups U.A.E. — Premium teacup puppies in Dubai',
    description:
      'Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.',
    images: ['/brand/logo.png'],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#fffdf8',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${figtree.variable} ${shantell.variable}`}>
      <body className="flex min-h-screen flex-col">
        {/* without JS the scroll-reveal never fires — keep every page visible */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;translate:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[99] focus:rounded-full focus:bg-cocoa focus:px-4 focus:py-2 focus:text-milk"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <FloatingActions />
        <Reveal />
        <Curtain />
      </body>
    </html>
  );
}
