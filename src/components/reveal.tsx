'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Scroll-reveal: watches every [data-reveal] element and adds .is-revealed
 * when it enters the viewport. Re-runs on every route change so freshly
 * navigated pages animate in instead of staying invisible, and a
 * MutationObserver catches elements mounted later (filters, accordions…).
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document
        .querySelectorAll<HTMLElement>('[data-reveal]')
        .forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-revealed');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    const scan = () => {
      document
        .querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)')
        .forEach((el) => io.observe(el));
    };

    scan();

    // late-mounted content (client filters, dynamic lists) joins the party too
    let scheduled = false;
    const mo = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
