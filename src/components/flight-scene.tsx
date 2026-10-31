'use client';

import { useEffect, useRef } from 'react';

/**
 * FLIGHT SCENE — the cartoon plane that ferries a Korean teacup puppy
 * from Korea to Dubai. Mirrors the reference site: the plane rides the
 * dashed Bézier route as you scroll, rotating with the path tangent and
 * fading in on take-off. Falls back to a static mid-flight pose for
 * reduced-motion visitors.
 */

const ROUTE = 'M40 250 C 170 40, 470 20, 620 168';
const PUP_PHOTO =
  '/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg';

export default function FlightScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const route = routeRef.current;
    const plane = planeRef.current;
    if (!wrap || !route || !plane) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof route.getTotalLength !== 'function') return;

    const len = route.getTotalLength();
    let target = 0;
    let current = -1;
    let raf = 0;

    const measure = () => {
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when the scene sits below the fold, 1 once it has climbed ~20% up
      target = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.8)));
    };

    const tick = () => {
      if (current < 0) current = target;
      current += (target - current) * 0.09;
      if (Math.abs(target - current) < 0.001) current = target;

      const d = current * len;
      const pt = route.getPointAtLength(d);
      const ahead = route.getPointAtLength(Math.min(len, d + 2));
      const ang = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
      plane.setAttribute(
        'transform',
        `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)}) rotate(${ang.toFixed(1)})`,
      );
      plane.style.opacity = current < 0.02 ? '0' : String(Math.min(1, (current - 0.02) * 10));

      raf = requestAnimationFrame(tick);
    };

    measure();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div ref={wrapRef} className="tp-flight" aria-hidden={false}>
      <svg
        viewBox="0 0 660 300"
        role="img"
        aria-label="A plane bringing a Korean Teacup Maltipoo puppy from Korea to Dubai"
      >
        <defs>
          <clipPath id="tp-flight-clip">
            <circle r="25" />
          </clipPath>
        </defs>

        <path ref={routeRef} d={ROUTE} className="tp-flight__route" />
        <circle cx="40" cy="250" r="7" className="tp-flight__dot" />
        <circle cx="620" cy="168" r="7" className="tp-flight__dot" />
        <text x="40" y="284" textAnchor="middle" className="tp-flight__label">
          Korea
        </text>
        <text x="620" y="202" textAnchor="middle" className="tp-flight__label">
          Dubai
        </text>

        {/* static mid-flight pose for no-JS / reduced motion; JS takes over */}
        <g ref={planeRef} transform="translate(205 106.7) rotate(-24)" style={{ opacity: 1 }}>
          <g transform="translate(-126 -78)">
            <path d="M28 60 L8 26 L34 26 L60 54 Z" className="tp-flight__wing" />
            <path
              d="M108 112 L142 156 L172 156 L158 112 Z"
              className="tp-flight__wing tp-flight__wing--far"
            />
            <path
              d="M20 80 C20 52 52 44 80 44 L168 44 C200 44 224 60 232 80 C224 100 200 112 168 112 L80 112 C52 112 20 104 20 80 Z"
              className="tp-flight__body"
            />
            <path d="M104 44 L138 2 L168 2 L154 44 Z" className="tp-flight__wing" />
            <path d="M206 64 C215 67 221 73 224 80" className="tp-flight__line" />
          </g>
          <g transform="translate(10 2)">
            <image
              href={PUP_PHOTO}
              x="-25"
              y="-25"
              width="50"
              height="50"
              clipPath="url(#tp-flight-clip)"
              preserveAspectRatio="xMidYMid slice"
            />
            <circle r="25" className="tp-flight__porthole" />
          </g>
        </g>
      </svg>
    </div>
  );
}
