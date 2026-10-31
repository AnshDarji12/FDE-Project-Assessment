'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Puppy } from '@/lib/data';
import PupSpot from '@/components/pup-spot';

/* ------------------------------------------------------------------
   HERO LINEUP — pups peek over the quilt and play peek-a-boo on a loop.
   ------------------------------------------------------------------ */

const SEATS = [
  { x: '9%', w: '8.6rem', peek: '0.62', tilt: '-5deg' },
  { x: '21.5%', w: '10.4rem', peek: '0.88', tilt: '2deg' },
  { x: '35.5%', w: '9rem', peek: '0.7', tilt: '-2deg' },
  { x: '64.5%', w: '9.4rem', peek: '0.78', tilt: '3deg' },
  { x: '78%', w: '10.8rem', peek: '0.92', tilt: '-1.5deg' },
  { x: '91%', w: '8.8rem', peek: '0.64', tilt: '4deg' },
];

const DUCK_DELAYS = [2600, 1800, 3200, 2200, 2800, 2000, 2400];

export function HeroLineup({ pups }: { pups: Puppy[] }) {
  const [states, setStates] = useState<Record<number, 'duck' | 'pop' | undefined>>({});
  const [tagged, setTagged] = useState<number | null>(null);
  const pupsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let n = 0;
    let alive = true;

    const pick = () => {
      if (!alive || !pupsRef.current) return;
      const seats = pupsRef.current.children.length;
      const e = Math.floor(Math.random() * seats);
      setStates((s) => ({ ...s, [e]: 'duck' }));
      timers.push(
        setTimeout(() => {
          if (!alive) return;
          setStates((s) => ({ ...s, [e]: 'pop' }));
          setTagged(e);
          timers.push(setTimeout(() => alive && setStates((s) => ({ ...s, [e]: undefined })), 700));
          timers.push(setTimeout(() => alive && setTagged(null), 1800));
        }, 360),
      );
      timers.push(setTimeout(pick, DUCK_DELAYS[n++ % DUCK_DELAYS.length]));
    };

    // start once the intro peek animation has finished
    const start = setTimeout(pick, 2000);
    return () => {
      alive = false;
      clearTimeout(start);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <ul ref={pupsRef} className="tp-lineup" aria-label="Some of the puppies in our showroom">
      {pups.map((p, i) => {
        const seat = SEATS[i % SEATS.length];
        return (
          <li
            key={p.slug}
            className="tp-lineup__seat"
            style={{
              ['--x' as string]: seat.x,
              ['--w' as string]: seat.w,
              ['--peek' as string]: seat.peek,
              ['--tilt' as string]: seat.tilt,
              ['--i' as string]: i,
            }}
          >
            <Link
              className="tp-lineup__pup"
              href={`/puppies/${p.slug}`}
              aria-label={`Meet ${p.name}, ${p.breed}`}
              data-state={states[i] || undefined}
            >
              <span className="tp-lineup__photo">
                <Image
                  src={p.images[0]}
                  alt={`${p.name} — ${p.breed} puppy`}
                  fill
                  priority={i < 3}
                  sizes="11rem"
                  className="object-cover"
                />
              </span>
            </Link>
          </li>
        );
      })}

      {/* floating name tags (mirror layer, non-interactive) */}
      <ul className="tp-lineup tp-lineup--tags" aria-hidden>
        {pups.map((p, i) => (
          <li
            key={`tag-${p.slug}`}
            className="tp-lineup__seat"
            style={{
              ['--x' as string]: SEATS[i % SEATS.length].x,
              ['--w' as string]: SEATS[i % SEATS.length].w,
              ['--peek' as string]: SEATS[i % SEATS.length].peek,
              ['--i' as string]: i,
            }}
          >
            <span className="tp-lineup__ghost" data-tag={tagged === i ? 'show' : undefined}>
              <span className="tp-lineup__name font-scrawl">{p.name}</span>
            </span>
          </li>
        ))}
      </ul>
    </ul>
  );
}

/* ------------------------------------------------------------------
   KENNEL ROW — pinned horizontal treadmill of kennel doors.
   Scroll drives the track; doors swing open as they pass 36% viewport.
   ------------------------------------------------------------------ */

const DOOR_COLORS = ['#a24a1a', '#8a4a2a', '#a24a1a', '#7c4326', '#a24a1a', '#8a4a2a', '#7c4326', '#a24a1a', '#8a4a2a'];

export function KennelRow({ pups }: { pups: Puppy[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const hallRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [maxX, setMaxX] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    const apply = () => setPinned(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // measure the track overflow
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setMaxX(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [pinned]);

  // scroll → spring-smoothed translate + floor sync + auto door opening
  useEffect(() => {
    if (!pinned || maxX <= 0) return;
    const wrap = wrapRef.current;
    const track = trackRef.current;
    const hall = hallRef.current;
    if (!wrap || !track || !hall) return;

    let target = 0;
    let current = 0;
    let raf = 0;

    const paint = (x: number) => {
      track.style.transform = `translateX(${x.toFixed(1)}px)`;
      hall.style.setProperty('--floor-x', `${x.toFixed(1)}px`);
      const limit = 0.36 * window.innerWidth;
      for (const li of Array.from(track.children) as HTMLElement[]) {
        const open = li.offsetLeft + x < limit;
        if (li.dataset.open !== String(open)) li.dataset.open = String(open);
      }
    };

    const tick = () => {
      // critically damped spring-ish lerp (matches stiffness 170 / damping 32 feel)
      current += (target - current) * 0.09;
      if (Math.abs(target - current) < 0.1) current = target;
      paint(current);
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
      target = -progress * maxX;
    };

    onScroll();
    paint(0);
    raf = requestAnimationFrame(tick);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [pinned, maxX]);

  // non-pinned fallback: open doors once they enter the viewport
  useEffect(() => {
    if (pinned) return;
    const track = trackRef.current;
    if (!track) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) (en.target as HTMLElement).dataset.open = 'true';
        }
      },
      { threshold: 0.55 },
    );
    track.querySelectorAll('.tp-door').forEach((d) => io.observe(d));
    return () => io.disconnect();
  }, [pinned]);

  const list = pups.slice(0, 9);

  return (
    <div
      ref={wrapRef}
      className="tp-meet"
      data-pinned={pinned || undefined}
      style={pinned ? { height: `calc(100vh + ${Math.round(maxX * 0.8)}px)` } : undefined}
    >
      <div className="tp-meet__stage">
        <header className="tp-meet__head gutter-x">
          <div>
            <h2 id="meet-title" className="font-plush text-[clamp(2.4rem,5vw,4.6rem)] font-black leading-none">
              Meet the pups
            </h2>
            <p className="tp-lead !mt-3 max-w-[44ch]">
              Real puppies, real photos, looking for their families right now.
            </p>
          </div>
          <Link href="/puppies" className="tp-btn shrink-0">
            See all available puppies
          </Link>
        </header>

        <div ref={hallRef} className="tp-meet__hall">
          <ul ref={trackRef} className="tp-meet__track" data-treadmill aria-label="Puppies looking for a family">
            {list.map((p, i) => (
              <li
                key={p.slug}
                className="tp-door"
                data-open="false"
                style={{ ['--door' as string]: DOOR_COLORS[i % DOOR_COLORS.length] }}
              >
                <Link className="tp-door__link" href={`/puppies/${p.slug}`}>
                  <span className="tp-door__plate">
                    <span className="tp-door__name font-plush font-black">{p.name}</span>
                    <span className="tp-door__meta">
                      {p.breed}, {p.sex}, {p.age}
                    </span>
                  </span>
                  <span className="tp-door__frame">
                    <span className="tp-door__room">
                      <Image
                        src={p.images[0]}
                        alt={`${p.name} — ${p.breed}`}
                        fill
                        sizes="(max-width: 640px) 42vw, 15rem"
                        className="object-cover"
                      />
                    </span>
                    {/* the swinging leaf lives INSIDE the way so it
                        inherits --door-open and the 3d perspective */}
                    <span className="tp-door__way" aria-hidden>
                      <span className="tp-door__leaf">
                        <svg viewBox="0 0 64 64" fill="currentColor" className="tp-door__peephole" aria-hidden>
                          <ellipse cx="32" cy="42" rx="14" ry="11" />
                          <circle cx="14" cy="26" r="7" />
                          <circle cx="27" cy="17" r="7" />
                          <circle cx="41" cy="17" r="7" />
                          <circle cx="52" cy="27" r="7" />
                        </svg>
                        <span className="tp-door__knob" />
                      </span>
                    </span>
                  </span>
                  <span className="tp-door__tag font-scrawl">Available</span>
                </Link>
              </li>
            ))}
            <li className="tp-door tp-door--all" data-open="false">
              <Link className="tp-door__link" href="/puppies">
                <span className="tp-door__frame tp-door__frame--all">
                  <span className="tp-door__all font-plush font-black">Meet them all</span>
                </span>
              </Link>
            </li>
          </ul>

          {/* walking teddy + floor */}
          <PupSpot className="tp-meet__teddy" pose="sit" act="treadmill" />
          <div className="tp-meet__floor" aria-hidden />
        </div>
      </div>
    </div>
  );
}
