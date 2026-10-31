'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import type { FamilyMedia } from '@/lib/data';
import { Heart } from '@/components/doodles';

const TILTS = ['-2.4deg', '1.8deg', '-1.2deg', '2.6deg', '-2deg', '1.4deg'];

/** Polaroid wall with keyboard-friendly lightbox. */
export default function PolaroidWall({
  items,
  columns = 'cols-2 sm:cols-3 lg:cols-4',
}: {
  items: FamilyMedia[];
  columns?: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((a) => (a === null ? a : (a + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, close, step]);

  return (
    <>
      <ul className={`grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 ${columns === '' ? '' : ''}`}>
        {items.map((f, i) => (
          <li key={f.img + i} data-reveal style={{ ['--d' as string]: `${(i % 4) * 60}ms` }}>
            <button
              type="button"
              className="tp-polaroid"
              style={{ ['--tilt' as string]: TILTS[i % TILTS.length] }}
              onClick={() => setActive(i)}
              aria-label={f.caption || `Open family photo ${i + 1}`}
            >
              <span className="tp-polaroid__ph">
                <Image
                  src={f.poster || f.img}
                  alt={f.caption || 'A happy TeddyPups family with their new puppy'}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                  className="object-cover"
                />
              </span>
              {f.caption ? <span className="tp-polaroid__cap">{f.caption}</span> : <span className="tp-polaroid__cap" aria-hidden>&nbsp;</span>}
            </button>
          </li>
        ))}
      </ul>

      {active !== null && (
        <div
          className="lb-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={items[active].caption || 'Family photo'}
          onClick={close}
        >
          <div className="lb-frame relative" onClick={(e) => e.stopPropagation()}>
            <Image
              src={items[active].poster || items[active].img}
              alt={items[active].caption || 'A happy TeddyPups family with their new puppy'}
              width={items[active].w || 900}
              height={items[active].h || 900}
              sizes="90vw"
              className="h-auto w-full"
            />
            {items[active].caption ? (
              <p className="flex items-center gap-2 px-4 py-3 font-scrawl text-sm text-milk">
                <Heart className="h-4 w-4 text-blush" />
                {items[active].caption}
              </p>
            ) : null}
            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border-2 border-milk bg-cocoa text-lg font-bold text-milk"
              aria-label="Close"
            >
              ✕
            </button>
            <button
              type="button"
              onClick={() => step(-1)}
              className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border-2 border-milk bg-cocoa text-milk"
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border-2 border-milk bg-cocoa text-milk"
              aria-label="Next photo"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}
