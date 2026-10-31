'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SITE } from '@/lib/data';
import { Wscp, Paw } from '@/components/doodles';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/puppies', label: 'Puppies' },
  { href: '/happy-families', label: 'Happy families' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Visit & contact' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header className="tp-header">
        <div className="tp-header__inner">
          <Link href="/" className="flex items-center gap-2" aria-label="TeddyPups U.A.E. — home">
            <Image
              src="/brand/logo.png"
              alt=""
              width={56}
              height={56}
              className="h-11 w-11 rounded-full border-2 border-cocoa object-cover"
              priority
            />
            <span className="font-scrawl text-xl font-bold tracking-tight text-cocoa">
              TeddyPups
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="tp-nav-link"
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="tp-btn tp-btn--wa hidden !px-5 !py-2.5 sm:inline-flex"
            >
              <Wscp className="h-4 w-4" />
              WhatsApp us
            </a>
            <button
              type="button"
              className="tp-btn tp-btn--ghost !px-4 !py-2.5 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <Paw className="h-4 w-4" />
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[70] flex flex-col bg-honey-soft transition-opacity duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex items-center justify-between px-[var(--gutter)] py-4">
          <span className="font-scrawl text-lg text-cocoa-soft">where to, friend?</span>
          <button
            type="button"
            className="tp-btn tp-btn--ghost !px-4 !py-2.5"
            onClick={() => setOpen(false)}
          >
            Close ✕
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-2 px-[var(--gutter)] pb-24">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="font-plush py-2 text-4xl font-black text-cocoa transition-colors hover:text-toffee-deep"
              style={{ transitionDelay: `${i * 30}ms` }}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="tp-btn tp-btn--wa mt-6 self-start"
          >
            <Wscp className="h-4 w-4" />
            WhatsApp us
          </a>
          <a href={SITE.phoneHref} className="mt-3 font-scrawl text-lg text-cocoa-soft">
            {SITE.phone}
          </a>
        </nav>
      </div>
    </>
  );
}
