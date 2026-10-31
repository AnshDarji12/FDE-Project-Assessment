import Link from 'next/link';
import { SITE } from '@/lib/data';
import {
  PuppyBasket,
  Moon,
  Star,
  Wscp,
  Insta,
  TikTok,
  Facebook,
  Mail,
} from '@/components/doodles';

const EXPLORE = [
  { href: '/puppies', label: 'Available puppies' },
  { href: '/gone-home', label: 'Gone home' },
  { href: '/happy-families', label: 'Happy families' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/how-it-works#delivery', label: 'Delivery & collection' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Visit & contact' },
];

export default function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-cocoa text-milk">
      {/* wavy top edge */}
      <svg
        viewBox="0 0 1440 46"
        preserveAspectRatio="none"
        aria-hidden
        className="absolute -top-1 left-0 right-0 h-[46px] w-full text-milk"
      >
        <path
          d="M0 46h1440V20c-60-18-120-18-180 0s-120 18-180 0-120-18-180 0-120 18-180 0-120-18-180 0-120 18-180 0-120-18-180 0-120 18-180 0-120-18-180 0v26Z"
          fill="currentColor"
        />
      </svg>

      <Moon className="absolute right-[8%] top-24 h-10 w-10 text-honey" />
      <Star className="absolute right-[18%] top-16 h-3 w-3 text-honey/70" />
      <Star className="absolute right-[30%] top-32 h-2.5 w-2.5 text-blush/60" />
      <Star className="absolute left-[12%] top-24 h-3 w-3 text-honey/60" />

      <div className="wrap relative pb-10 pt-28">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <h2 className="font-plush text-4xl font-black text-honey md:text-5xl">
              Home, at last.
            </h2>
            <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-milk/75">
              TeddyPups U.A.E. is a Dubai-based brand specializing in miniature
              puppies, offering premium services and worldwide shipping.
            </p>
            <PuppyBasket className="mt-10 h-36 w-auto" />
          </div>

          <nav aria-label="Explore">
            <h3 className="font-scrawl text-lg text-honey">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {EXPLORE.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[0.95rem] font-semibold text-milk/85 underline-offset-4 transition-colors hover:text-honey hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-scrawl text-lg text-honey">Say hello</h3>
            <ul className="mt-4 space-y-2.5 text-[0.95rem] font-semibold text-milk/85">
              <li className="flex items-center gap-2">
                <Wscp className="h-4 w-4 text-leaf" />
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:text-honey hover:underline"
                >
                  WhatsApp {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-honey" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="underline-offset-4 hover:text-honey hover:underline"
                >
                  {SITE.email}
                </a>
              </li>
              <li>{SITE.address}</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="tp-btn tp-btn--dark !px-4 !py-2 !text-[0.8rem]"
                aria-label="TeddyPups on Instagram"
              >
                <Insta className="h-4 w-4" />
                Instagram
              </a>
              <a
                href={SITE.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="tp-btn tp-btn--dark !px-4 !py-2 !text-[0.8rem]"
                aria-label="TeddyPups on TikTok"
              >
                <TikTok className="h-4 w-4" />
                TikTok
              </a>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="tp-btn tp-btn--dark !px-4 !py-2 !text-[0.8rem]"
                aria-label="TeddyPups on Facebook"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-milk/15 pt-6 text-sm text-milk/60">
          <p>© {new Date().getFullYear()} TeddyPups U.A.E.</p>
          <p className="font-scrawl text-honey/90">{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
