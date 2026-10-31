'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

interface Slide {
  type: 'image' | 'video';
  src: string;
  poster?: string;
  alt: string;
}

/** Photo/video carousel with thumbnails, arrows and counter — detail page. */
export default function PuppyCarousel({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const current = slides[i];

  const go = useCallback(
    (dir: 1 | -1) => setI((v) => (v + dir + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  if (!current) return null;

  return (
    <div>
      <div className="relative rounded-[1.6rem] border-[3px] border-cocoa bg-milk p-2 shadow-[8px_10px_0_0_#2a170e33]">
        <div className="relative aspect-[4/3.4] overflow-hidden rounded-[1.2rem] bg-honey-soft sm:aspect-[4/3]">
          {current.type === 'video' ? (
            <video
              key={current.src}
              src={current.src}
              poster={current.poster}
              className="h-full w-full object-cover"
              controls
              playsInline
              preload="metadata"
              aria-label={current.alt}
            />
          ) : (
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 40rem"
              className="object-cover"
            />
          )}
        </div>

        <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border-2 border-cocoa bg-cocoa px-3 py-1 text-xs font-bold text-milk">
          {i + 1}/{slides.length}
        </span>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border-2 border-cocoa bg-milk text-xl font-bold text-cocoa shadow-[0_3px_0_0_#2a170e] transition hover:-rotate-3 hover:bg-honey-soft"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border-2 border-cocoa bg-milk text-xl font-bold text-cocoa shadow-[0_3px_0_0_#2a170e] transition hover:rotate-3 hover:bg-honey-soft"
        >
          ›
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-3" role="tablist" aria-label="Puppy media">
        {slides.map((s, idx) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={idx === i}
            aria-label={`Show ${s.type === 'video' ? 'video' : `photo ${idx + 1}`}`}
            onClick={() => setI(idx)}
            className={`relative h-16 w-16 overflow-hidden rounded-xl border-2 transition sm:h-20 sm:w-20 ${
              idx === i ? 'border-toffee shadow-[0_3px_0_0_#2a170e]' : 'border-cocoa/60 opacity-80 hover:opacity-100'
            }`}
          >
            <Image
              src={s.type === 'video' ? s.poster || s.src : s.src}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
            {s.type === 'video' && (
              <span className="absolute inset-0 grid place-items-center bg-cocoa/35 text-lg text-milk">▶</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
