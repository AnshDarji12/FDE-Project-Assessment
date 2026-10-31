'use client';

import { useEffect, useRef, useState } from 'react';
import PupBuddy from '@/components/pup-buddy';

/**
 * PupJourney — Teddy walks down the page as you scroll.
 *
 * A fixed layer holds one big puppy actor. The page marks resting spots with
 * `[data-pup-stop]` anchors (PupSpot). While a stop's hold band is in view the
 * puppy rests there (sitting / peeking / walking in place on the treadmill),
 * and between two stops it walks a curved path with a wiggling walk cycle,
 * flips to face its direction and stamps little paw prints. Each arrival pops
 * a speech bubble. Mirrors the reference site's journey behaviour.
 */

type Pose = 'peek' | 'walk' | 'sit' | 'snug';

interface Stop {
  pose: Pose;
  act: string;
  facing: 1 | -1;
  x: number; // page-space foot anchor
  y: number;
  s: number; // scale
  enter: number; // scrollY where the rest starts
  exit: number; // scrollY where the walk to the next stop starts
}

const PHRASES = [
  'woof!',
  'hi, friend!',
  'sniff sniff',
  'let’s play!',
  'follow me!',
  'on my way!',
  'so many friends!',
  'treat, please?',
];

const POSE_OF: Record<string, Pose> = {
  sit: 'sit',
  peek: 'peek',
  snug: 'snug',
  bow: 'sit',
  stand: 'sit',
};

const PAW_PATH = 'M32 44c-8 0-14-5.5-14-12.5S24 19 32 19s14 5.5 14 12.5S40 44 32 44Zm-19-16c-3.4 0-6-2.8-6-6s2.6-6 6-6 6 2.8 6 6-2.6 6-6 6Zm12-17c-3.4 0-6-2.9-6-6.5s2.6-6.5 6-6.5 6 2.9 6 6.5-2.6 6.5-6 6.5Zm14 0c-3.4 0-6-2.9-6-6.5s2.6-6.5 6-6.5 6 2.9 6 6.5-2.6 6.5-6 6.5Zm12 17c-3.4 0-6-2.8-6-6s2.6-6 6-6 6 2.8 6 6-2.6 6-6 6Z';

export default function PupJourney() {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const actorRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const bubbleRef = useRef<HTMLSpanElement | null>(null);
  const printsRef = useRef<HTMLDivElement | null>(null);
  const [pose, setPose] = useState<Pose>('sit');
  const [facing, setFacing] = useState<'right' | 'left'>('right');

  useEffect(() => {
    const layer = layerRef.current;
    const actor = actorRef.current;
    const body = bodyRef.current;
    const bubble = bubbleRef.current;
    const printsBox = printsRef.current;
    if (!layer || !actor || !body || !bubble || !printsBox) return;

    const small = window.matchMedia('(max-width: 767px)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (small || coarse || calm) return; // static buddies stay visible instead

    const printEls = Array.from(printsBox.children) as SVGSVGElement[];
    const html = document.documentElement;
    html.dataset.pup = 'true';
    layer.hidden = false;

    let stops: Stop[] = [];
    let raf = 0;
    let last = performance.now() / 1000;
    let curX = 0;
    let curY = 0;
    let curS = 0.6;
    let have = false;
    let resting = -1;
    let bubbleOff = 0;
    let walkedAcc = 0;
    let lastStampX = 0;
    let stampSide = 0;
    let pi = 0;
    const prints: { el: SVGSVGElement; x: number; y: number; born: number }[] = [];

    const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const smooth = (t: number) => t * t * (3 - 2 * t);

    const say = (txt: string, secs = 2.4) => {
      bubble.textContent = txt;
      bubble.dataset.show = 'true';
      bubbleOff = performance.now() / 1000 + secs;
    };

    const setPoseFace = (p: Pose, f: 1 | -1) => {
      setPose((prev) => (prev === p ? prev : p));
      setFacing((prev) => (prev === (f === 1 ? 'right' : 'left') ? prev : f === 1 ? 'right' : 'left'));
      actor.dataset.facing = f === 1 ? 'right' : 'left';
    };

    const measure = () => {
      const sy = window.scrollY;
      const vh = window.innerHeight;
      const els = Array.from(document.querySelectorAll<HTMLElement>('[data-pup-stop]')).filter(
        (el) => el.getClientRects().length > 0,
      );
      const raw = els.map((el) => {
        const r = el.getBoundingClientRect();
        const s = (r.width / 300) * 1.12;
        return {
          pose: POSE_OF[el.dataset.pose || 'sit'] || 'sit',
          act: el.dataset.act || '',
          facing: (el.dataset.facing === 'left' ? -1 : 1) as 1 | -1,
          x: r.left + 150 * s,
          y: r.top + sy + 228 * s,
          s,
        };
      });
      // hold bands: rest while the stop's feet sit between 42%..70% of the viewport
      const bands = raw.map((st) => [st.y - vh * 0.7, st.y - vh * 0.42] as [number, number]);
      for (let i = 0; i < bands.length - 1; i++) {
        const mid = (bands[i][1] + bands[i + 1][0]) / 2;
        if (bands[i][1] > mid) bands[i][1] = mid;
        if (bands[i + 1][0] < mid) bands[i + 1][0] = mid;
        if (bands[i][1] < bands[i][0]) {
          const m = (bands[i][0] + bands[i][1]) / 2;
          bands[i] = [m, m];
        }
      }
      stops = raw.map((st, i) => ({ ...st, enter: bands[i][0], exit: bands[i][1] }));
    };

    const stamp = (x: number, y: number, size: number) => {
      const el = printEls[pi % printEls.length];
      pi += 1;
      const idx = prints.findIndex((p) => p.el === el);
      if (idx >= 0) prints.splice(idx, 1);
      prints.push({ el, x, y, born: performance.now() });
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      // replay the CSS fade animation
      el.style.animation = 'none';
      void el.getBoundingClientRect();
      el.style.animation = '';
    };

    const frame = (nowMs: number) => {
      raf = requestAnimationFrame(frame);
      const now = nowMs / 1000;
      const dt = Math.min(0.05, now - last);
      last = now;
      const sy = window.scrollY;
      if (!stops.length) return;

      // where are we on the journey?
      let rest = -1;
      let t = 0;
      let i0 = -1;
      let i1 = -1;
      if (sy <= stops[0].enter) {
        rest = 0;
      } else if (sy >= stops[stops.length - 1].exit) {
        rest = stops.length - 1;
      } else {
        for (let i = 0; i < stops.length; i++) {
          if (sy >= stops[i].enter && sy <= stops[i].exit) {
            rest = i;
            break;
          }
          if (i < stops.length - 1 && sy > stops[i].exit && sy < stops[i + 1].enter) {
            i0 = i;
            i1 = i + 1;
            t = clamp01((sy - stops[i].exit) / Math.max(1, stops[i + 1].enter - stops[i].exit));
            break;
          }
        }
        if (rest < 0 && i0 < 0) rest = stops.length - 1;
      }

      let tx: number;
      let ty: number;
      let ts: number;
      if (rest >= 0) {
        const st = stops[rest];
        tx = st.x;
        ty = st.y;
        ts = st.s;
        setPoseFace(st.act === 'treadmill' ? 'walk' : st.pose, st.facing);
        if (resting !== rest) {
          resting = rest;
          say(PHRASES[Math.floor(Math.random() * PHRASES.length)]);
          walkedAcc = 0;
        }
      } else {
        const a = stops[i0];
        const b = stops[i1];
        const e = smooth(t);
        tx = lerp(a.x, b.x, e);
        ty = lerp(a.y, b.y, e);
        ts = lerp(a.s, b.s, e);
        setPoseFace('walk', b.x >= a.x ? 1 : -1);
        resting = -1;
        // paw prints every ~34 scaled px of horizontal progress, alternating sides
        walkedAcc += Math.abs(tx - (lastStampX || tx));
        if (walkedAcc > 34 * ts) {
          walkedAcc = 0;
          stampSide += 1;
          const side = stampSide % 2 === 0 ? -1 : 1;
          const off = (side * 12 + 6) * ts;
          stamp(tx + off, ty + (side === 1 ? 2 : -4) * ts, 15 * Math.max(0.7, ts));
          lastStampX = tx;
        }
      }
      lastStampX = tx;

      // ease toward the target (feels alive without lagging behind the scroll)
      const k = have ? 1 - Math.exp(-dt / 0.09) : 1;
      curX = have ? lerp(curX, tx, k) : tx;
      curY = have ? lerp(curY, ty, k) : ty;
      curS = have ? lerp(curS, ts, k) : ts;
      have = true;

      actor.style.transform = `translate3d(${(curX - 150 * curS).toFixed(2)}px, ${(curY - sy - 228 * curS).toFixed(2)}px, 0)`;
      body.style.transform = `scale(${curS.toFixed(4)})`;

      // page-glued paw prints (fixed layer → re-anchor every frame)
      const keep: typeof prints = [];
      for (const p of prints) {
        const age = (nowMs - p.born) / 2400;
        if (age >= 1) continue;
        keep.push(p);
        p.el.style.transform = `translate(${p.x.toFixed(1)}px, ${(p.y - sy).toFixed(1)}px)`;
      }
      prints.length = 0;
      prints.push(...keep);

      if (bubble.dataset.show === 'true' && now > bubbleOff) bubble.dataset.show = 'false';
    };

    const start = () => {
      measure();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    };

    start();
    const ro = new ResizeObserver(() => measure());
    ro.observe(document.body);
    window.addEventListener('resize', start);
    window.addEventListener('load', start);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', start);
      window.removeEventListener('load', start);
      delete html.dataset.pup;
      layer.hidden = true;
    };
  }, []);

  return (
    <div ref={layerRef} className="pup-layer" data-front="true" hidden aria-hidden="true">
      <div ref={printsRef} className="pup-prints">
        {Array.from({ length: 14 }).map((_, i) => (
          <svg key={i} viewBox="0 0 64 64" aria-hidden="true">
            <path d={PAW_PATH} />
          </svg>
        ))}
      </div>
      <div ref={actorRef} className="pup-actor" data-facing="right">
        <div ref={bodyRef} className="pup-actor__body">
          <PupBuddy pose={pose} facing={facing} />
          <span className="pup-bubble-at">
            <span ref={bubbleRef} className="pup-bubble font-scrawl" data-show="false" />
          </span>
        </div>
      </div>
    </div>
  );
}
