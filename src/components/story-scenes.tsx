'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { SITE } from '@/lib/data';
import PupSpot from '@/components/pup-spot';
import { Wscp, PlaneDoodle } from '@/components/doodles';

/* ------------------------------------------------------------------
   JOURNEY CHAT — WhatsApp phone where messages land as you scroll.
   Steps highlight (num fills, older steps dim) driven by scroll.
   ------------------------------------------------------------------ */

const STEPS = [
  {
    t: 'Choose your breed',
    d: "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.",
  },
  {
    t: 'Get photos & details',
    d: 'Our team will share real photos, health details, and all necessary information directly on WhatsApp.',
  },
  {
    t: 'Secure & safe delivery',
    d: 'Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.',
  },
];

const CHIPS = ['Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu'];

export function JourneyChat() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const list = listRef.current;
      if (!list) return;
      const steps = Array.from(list.children) as HTMLElement[];
      const line = window.innerHeight * 0.45;
      let k = 0;
      steps.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (r.top <= line) k = i;
      });
      setActive(k);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="tp-chat__grid gutter-x">
      <div className="tp-chat__story">
        <h2 id="journey-title" className="font-plush text-[clamp(2.4rem,5vw,4.6rem)] font-black leading-none">
          Your puppy journey
        </h2>
        <p className="tp-lead !mt-5 max-w-[42ch]">
          A premium, step-by-step concierge experience. We make adoption simple,
          secure, and purely joyful.
        </p>

        <ol ref={listRef} className="tp-chat__steps">
          {STEPS.map((s, i) => (
            <li
              key={s.t}
              className="tp-chat__step"
              data-active={active === i || undefined}
              data-done={active > i || undefined}
            >
              <span className="tp-chat__num font-plush font-black" aria-hidden>
                {i + 1}
              </span>
              <h3 className="font-plush tp-chat__title font-black">{s.t}</h3>
              <p className="tp-chat__text">{s.d}</p>
            </li>
          ))}
        </ol>

        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="tp-btn tp-btn--ghost tp-chat__cta"
        >
          How it works
        </a>
      </div>

      <div className="tp-chat__side">
        <div className="tp-phone" role="group" aria-label="A WhatsApp conversation with TeddyPups U.A.E.">
          <div className="tp-phone__bar">
            <span className="relative block h-10 w-10 overflow-hidden rounded-full border-2 border-cocoa">
              <Image src="/brand/logo.png" alt="" fill sizes="40px" className="object-cover" />
            </span>
            <span>
              <span className="tp-phone__name">TeddyPups U.A.E.</span>
              <span className="tp-phone__status">online</span>
            </span>
          </div>

          <div className="tp-phone__screen">
            <p className="tp-msg tp-msg--me">
              Hi TeddyPups! I&apos;d love to know more about your puppies.
            </p>

            <div className="tp-msg-group" data-show={String(active >= 0)}>
              <p className="tp-msg tp-msg--them">
                Select your preferred breed or tell us what you&apos;re looking for.
                We&apos;ll guide you based on availability and your lifestyle.
              </p>
              <p className="flex flex-wrap gap-1.5">
                {CHIPS.map((c) => (
                  <span key={c} className="tp-chip !cursor-default !py-1 !text-xs">
                    {c}
                  </span>
                ))}
              </p>
            </div>

            <div className="tp-msg-group" data-show={String(active >= 1)}>
              <p className="tp-msg tp-msg--them">
                Our team will share real photos, health details, and all necessary
                information directly on WhatsApp.
              </p>
            </div>

            <div className="tp-msg-group" data-show={String(active >= 2)}>
              <p className="tp-msg tp-msg--them">
                Once confirmed, we handle everything professionally and ensure your
                puppy reaches you safely and stress-free.
              </p>
            </div>
          </div>

          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="tp-phone__compose"
          >
            Say hello on WhatsApp
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M3.4 20.4 20.9 12 3.4 3.6l.1 6.5L14 12 3.5 13.9l-.1 6.5Z" />
            </svg>
          </a>
        </div>

        <PupSpot className="tp-chat__teddy" pose="sit" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   DUSK HORIZON — sun sinks behind the city when scrolled into view.
   ------------------------------------------------------------------ */

export function DuskHorizon() {
  const ref = useRef<HTMLDivElement>(null);
  const [inview, setInview] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setInview(true)),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="tp-horizon" data-inview={inview}>
      <span className="tp-horizon__sun" aria-hidden />
      <PlaneDoodle className="absolute left-[30%] top-[-3.2rem] h-14 w-auto" />
      <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="tp-horizon__city" aria-hidden>
        <path d="M0 160V118h34v-14h22v-22h30v34h18V96h26v30h22v-18h16v-30h34v40h20V70h28v56h24V98h18v-26h30v54h20v-38h26v-40l14-6 14 6v40h22v46h18V84h26v-30h22v50h24V76h36v50h20V96h18v-58h30v44h14V96h22v-30h16v22h26v-52l6-8v-24l4-6v-30l3-18 3 18v30l4 6v24l6 8v52h26v30h22V82h30v-20h24v48h20V90h28v-36h26v56h18V74h30v36h22V94h26v30h30V70h34v54h22V88h26v36h20V60h28v64h24V96h30v28h22V78h26v46h18V94h34v30h22V80h26v44h20v-56h30v56h22V88h34v36h20V72h26v52h30v36H0Z" />
      </svg>
      <div className="tp-horizon__ground" aria-hidden />
    </div>
  );
}

/* ------------------------------------------------------------------
   NIGHT HOUSE — front door swings open when scrolled into view.
   ------------------------------------------------------------------ */

export function NightHouse({ children }: { children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setOpen(true)),
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="tp-house" data-open={open || undefined}>
      {/* warm inside with the puppy photo */}
      <span className="tp-house__doorway">
        <span className="tp-house__inside">
          <Image
            src="/media/lMhASnmIIVQ4/ad2353ad31/b942a5_6a5617708d75408b8f73725080ed0149-mv2.jpg"
            alt="A fluffy puppy waiting at the door"
            fill
            sizes="12rem"
            className="object-cover"
          />
        </span>
        <span className="tp-house__door">
          <span className="tp-house__peep" />
          <span className="tp-house__knob" />
        </span>
      </span>
      <span className="tp-house__lamp" aria-hidden />
      <span className="tp-house__plant tp-house__plant--left" aria-hidden />
      <span className="tp-house__plant tp-house__plant--right" aria-hidden />
      <span className="tp-house__mat font-scrawl" aria-hidden>
        welcome home
      </span>
      <PupSpot className="tp-house__teddy" pose="bow" />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------
   STAMP BOOK — IO fallback so stamps "thump" in on older browsers.
   ------------------------------------------------------------------ */

export function StampBook({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [stamped, setStamped] = useState(false);

  useEffect(() => {
    // if the browser supports scroll-driven animations, let CSS do it
    if (CSS.supports('animation-timeline: view()')) return;
    const el = ref.current;
    if (!el) return;
    const stamps = el.querySelectorAll('.tp-stamp');
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setStamped(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    stamps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} data-stamped={stamped || undefined}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------
   WHATSAPP CTA helper (shared by night scenes)
   ------------------------------------------------------------------ */

export function WaGhostButton({ children }: { children: React.ReactNode }) {
  return (
    <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="tp-btn tp-btn--wa">
      <Wscp className="h-4 w-4" />
      {children}
    </a>
  );
}
